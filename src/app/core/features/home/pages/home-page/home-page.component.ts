import { Component, OnInit } from '@angular/core';
import { SuggestionBubbleComponent } from '../../components/suggestion-bubble/suggestion-bubble.component';
import { AiBubbleComponent } from '../../components/ai-bubble/ai-bubble/ai-bubble.component';
import { DEFAULT_ORB_SUGGESTIONS } from '../../../../shared/utils/constants';
import { NgIf } from '@angular/common';
import { AudioRecorderComponent } from '../../../../shared/components/audio-recorder/audio-recorder.component';
import { Subscription } from 'rxjs';
import { TranscriptionNotifier } from '../../../../services/transcription-notifier.service';
import { IntentRoutingService } from '../../../../services/intent-routing.service';
import { AIModelService } from '../../../../services/ai-model.service';

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
      this.transcriptionNotifier.notification$.subscribe((intent) => {
        this.hasTranscription = true;
        this.recievedTranscription = intent.text;
        this.intentRoutingService.routeBasedOnIntent(intent);
      })
    );
  }

  constructor(
    private transcriptionNotifier: TranscriptionNotifier,
    private intentRoutingService: IntentRoutingService,
    private aiModelService: AIModelService
  ) {
    this.isStarted = false;
  }

  public toggleHasStarted(): void {
    this.isStarted = !this.isStarted;
  }

  public onAudioTranscript(transcript: string): void {
    this.hasTranscription = true;
    // send text to model
    this.aiModelService.sendTextToModel(transcript).subscribe({
      next: (response: any) => {
        console.log('Received intent from AI model:', response);
        this.transcriptionNotifier.emitNotification({
          entities: response.result.entities,
          intent: response.result.intent,
          text: response.result.text,
          intent_confidence: response.result.intent_confidence,
        });
      },
      error: (errd) => {
        console.log('Error receiving intent from AI model:', errd);
      },
    });
  }
}
