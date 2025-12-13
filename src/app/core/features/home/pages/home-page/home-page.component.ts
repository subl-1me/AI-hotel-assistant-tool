import { Component, OnInit } from '@angular/core';
import { SuggestionBubbleComponent } from '../../components/suggestion-bubble/suggestion-bubble.component';
import { AiBubbleComponent } from '../../components/ai-bubble/ai-bubble/ai-bubble.component';
import { DEFAULT_ORB_SUGGESTIONS } from '../../../../shared/utils/constants';
import { NgIf } from '@angular/common';
import { AudioRecorderComponent } from '../../../../shared/components/audio-recorder/audio-recorder.component';
import { Subscription } from 'rxjs';
import { IntentService } from '../../../../services/transcription-notifier.service';

@Component({
  selector: 'app-home-page',
  imports: [
    SuggestionBubbleComponent,
    AiBubbleComponent,
    NgIf,
    AudioRecorderComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  public isStarted: boolean;
  public defaultSuggestions: string[] = DEFAULT_ORB_SUGGESTIONS;
  public hasTranscription: boolean = false;
  public recievedTranscription: string = '';

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.intentService.notification$.subscribe((notification) => {
        this.hasTranscription = true;
        this.recievedTranscription = notification;
      })
    );
  }

  constructor(private intentService: IntentService) {
    this.isStarted = false;
  }

  public toggleHasStarted(): void {
    this.isStarted = !this.isStarted;
  }

  public onAudioTranscript(transcript: string): void {
    console.log('Transcripción recibida:', transcript);
  }
}
