import { Component, OnInit } from '@angular/core';
import { SuggestionBubbleComponent } from '../../components/suggestion-bubble/suggestion-bubble.component';
import { AiBubbleComponent } from '../../components/ai-bubble/ai-bubble/ai-bubble.component';
import { DEFAULT_ORB_SUGGESTIONS } from '../../../../shared/utils/constants';
import { NgIf } from '@angular/common';
import { AudioRecorderComponent } from '../../../../shared/components/audio-recorder/audio-recorder.component';
import { last, Subject, Subscription } from 'rxjs';
import { TranscriptionService } from '../../../../services/transcription-service';
import { IntentRoutingService } from '../../../../services/intent.service';
import { AIModelService } from '../../../../services/ai-model.service';
import { FormsModule } from '@angular/forms';
import Intent from '../../../../models/Intent';

@Component({
  selector: 'app-home-page',
  imports: [
    FormsModule,
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
  public customText: string = '';

  private intentSubjet = new Subject<Intent>();
  public intent$ = this.intentSubjet.asObservable();

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.transcriptionService.notification$.subscribe((intent) => {
        this.hasTranscription = true;
        this.recievedTranscription = intent.text;
        this.intentRoutingService.routeBasedOnIntent(intent);
      }),
    );
  }

  constructor(
    private transcriptionService: TranscriptionService,
    private intentRoutingService: IntentRoutingService,
    private aiModelService: AIModelService,
  ) {
    this.isStarted = true;
  }

  public toggleHasStarted(): void {
    this.isStarted = !this.isStarted;
  }

  public onAudioTranscript(transcript: string): void {
    this.hasTranscription = true;

    // classify transcription using regex patterns
    const intent = this.intentRoutingService.searchForIntent(this.customText);

    if (intent) {
      console.log('Classified intent using regex:', intent);
      this.transcriptionService.emitIntent(intent);
      return;
    }

    // send transcription to AI model
    this.aiModelService.sendTextToModel(transcript).subscribe({
      next: (response: any) => {
        console.log('Received intent from AI model:', response);
        this.transcriptionService.emitIntent({
          entities: response.result.entities,
          intent: response.result.intent,
          text: response.result.text,
          intent_confidence: response.result.intent_confidence,
        });
      },
      error: (error) => {
        console.log('Error receiving intent from AI model:', error);
      },
    });
  }

  public onCustomText(): void {
    if (this.customText.trim() === '') return;

    const intent = this.intentRoutingService.searchForIntent(this.customText);
    if (intent) {
      console.log('Classified intent using regex:', intent);
      this.intentRoutingService.routeBasedOnIntent(intent);
      return;
    }

    this.aiModelService.sendTextToModel(this.customText).subscribe({
      next: (response: any) => {
        console.log('Received intent from AI model:', response);
        this.transcriptionService.emitIntent({
          entities: response.result.entities,
          intent: response.result.intent,
          text: response.result.text,
          intent_confidence: response.result.intent_confidence,
        });
      },
      error: (error) => {
        console.log('Error receiving intent from AI model:', error);
      },
    });
  }
}
