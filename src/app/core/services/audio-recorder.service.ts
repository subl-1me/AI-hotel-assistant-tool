import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AudioRecorderService {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private recordingState = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  async startRecording(): Promise<void> {
    try {
      // request access to mic
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      // config media recorder
      this.mediaRecorder = new MediaRecorder(stream, {
        mimeType: this.getBestMimeType(),
      });

      this.audioChunks = [];

      // get audio chuncks
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      // start recording
      this.mediaRecorder.start();
      this.recordingState.next(true);

      console.log('Grabación iniciada');
    } catch (error) {
      console.error('Error al acceder al micrófono:', error);
      throw error;
    }
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No hay grabación en curso'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        // final audio blob
        const audioBlob = new Blob(this.audioChunks, {
          type: this.mediaRecorder?.mimeType || 'audio/webm',
        });

        // Detener stream
        this.mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
        this.mediaRecorder = null;
        this.recordingState.next(false);

        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  sendAudioToBackend(audioBlob: Blob): Observable<any> {
    const formData = new FormData();
    const filename = `audio.${this.getFileExtension()}`;

    formData.append('audio', audioBlob, filename);

    return this.http.post('http://localhost:5000/api/process-audio', formData, {
      reportProgress: true,
      responseType: 'json',
    });
  }

  async recordAndProcess(): Promise<Observable<any>> {
    try {
      await this.startRecording();

      return new Observable((subscriber) => {
        // stop button
      });
    } catch (error) {
      throw error;
    }
  }

  async recordForDuration(durationMs: number = 5000): Promise<Observable<any>> {
    await this.startRecording();

    return new Observable((subscriber) => {
      setTimeout(async () => {
        try {
          const audioBlob = await this.stopRecording();
          this.sendAudioToBackend(audioBlob).subscribe({
            next: (response) => subscriber.next(response),
            error: (err) => subscriber.error(err),
            complete: () => subscriber.complete(),
          });
        } catch (error) {
          subscriber.error(error);
        }
      }, durationMs);
    });
  }

  private getBestMimeType(): string {
    const types = [
      'audio/webm;codecs=opus',
      'audio/ogg;codecs=opus',
      'audio/webm',
      'audio/ogg',
      'audio/mp4',
    ];

    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type;
      }
    }

    return ''; // El navegador usará su default
  }

  private getFileExtension(): string {
    if (!this.mediaRecorder) return 'webm';

    const mimeType = this.mediaRecorder.mimeType;
    if (mimeType.includes('webm')) return 'webm';
    if (mimeType.includes('ogg')) return 'ogg';
    if (mimeType.includes('mp4')) return 'mp4';
    return 'webm';
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }

  getRecordingState() {
    return this.recordingState.asObservable();
  }
}
