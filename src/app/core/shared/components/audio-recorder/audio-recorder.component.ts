// audio-recorder.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { AudioRecorderService } from '../../../services/audio-recorder.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-audio-recorder',
  imports: [NgIf, NgFor],
  templateUrl: './audio-recorder.component.html',
  styleUrls: ['./audio-recorder.component.css'],
})
export class AudioRecorderComponent implements OnInit, OnDestroy {
  isRecording = false;
  recordingTime = 0;
  timer: any;
  audioUrl: string | null = null;
  response: any = null;
  error: string | null = null;
  loading = false;

  private recordingSub!: Subscription;
  @Output() audioTranscript = new EventEmitter<string>();

  constructor(private audioService: AudioRecorderService) {}

  ngOnInit() {
    this.recordingSub = this.audioService
      .getRecordingState()
      .subscribe((state) => {
        this.isRecording = state;
        if (state) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      });
  }

  /**
   * Iniciar grabación manual
   */
  async startRecording() {
    try {
      this.error = null;
      await this.audioService.startRecording();
    } catch (err: any) {
      this.error =
        'No se pudo acceder al micrófono. Asegúrate de permitir los permisos.';
      console.error(err);
    }
  }

  /**
   * Detener grabación y enviar
   */
  async stopAndSend() {
    try {
      this.loading = true;
      this.error = null;

      const audioBlob = await this.audioService.stopRecording();

      // Opcional: Crear URL para previsualización
      this.audioUrl = URL.createObjectURL(audioBlob);

      // Enviar al backend
      this.audioService.sendAudioToBackend(audioBlob).subscribe({
        next: (res) => {
          this.response = res;
          this.loading = false;
          this.audioTranscript.emit(res.transcript);
        },
        error: (err) => {
          this.error = err.error?.error || 'Error al procesar el audio';
          this.loading = false;
          console.error(err);
        },
      });
    } catch (err: any) {
      this.error = err.message || 'Error al detener la grabación';
      this.loading = false;
    }
  }

  /**
   * Grabar por tiempo fijo (ej: 5 segundos)
   */
  async recordFixedDuration() {
    this.loading = true;
    this.error = null;

    (await this.audioService.recordForDuration(5000)).subscribe({
      next: (res) => {
        this.response = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Error al procesar el audio';
        this.loading = false;
      },
    });
  }

  private startTimer() {
    this.recordingTime = 0;
    this.timer = setInterval(() => {
      this.recordingTime++;
    }, 1000);
  }

  private stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /**
   * Limpiar previsualización de audio
   */
  clearAudio() {
    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl);
      this.audioUrl = null;
    }
    this.response = null;
  }

  ngOnDestroy() {
    if (this.recordingSub) {
      this.recordingSub.unsubscribe();
    }
    this.stopTimer();
    this.clearAudio();

    // Asegurar que no quede grabación activa
    if (this.isRecording) {
      this.audioService.stopRecording().catch(() => {});
    }
  }
}
