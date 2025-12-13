import { Component } from '@angular/core';
import { AIModelService } from '../../../services/ai-model.service';
import { TranscriptionNotifier } from '../../../services/transcription-notifier.service';

@Component({
  selector: 'app-testing-toolbar',
  imports: [],
  templateUrl: './testing-toolbar.component.html',
  styleUrl: './testing-toolbar.component.css',
})
export class TestingToolbarComponent {
  constructor(
    private aiModelService: AIModelService,
    private transcriptionNotifier: TranscriptionNotifier
  ) {}

  onTestButtonClick(text: string): void {
    this.aiModelService.sendTextToModel(text).subscribe((response) => {
      const { success, result } = response;
      const { intent, entities, intent_confidence, text } = result;
      this.transcriptionNotifier.emitNotification(text);
    });
  }
}
