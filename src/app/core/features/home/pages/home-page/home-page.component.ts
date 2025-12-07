import { Component } from '@angular/core';
import { SuggestionBubbleComponent } from '../../components/suggestion-bubble/suggestion-bubble.component';
import { AiBubbleComponent } from '../../components/ai-bubble/ai-bubble/ai-bubble.component';
import { DEFAULT_ORB_SUGGESTIONS } from '../../../../shared/utils/constants';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [SuggestionBubbleComponent, AiBubbleComponent, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  public isStarted: boolean;
  public defaultSuggestions: string[] = DEFAULT_ORB_SUGGESTIONS;

  constructor() {
    this.isStarted = false;
  }

  public toggleHasStarted(): void {
    this.isStarted = !this.isStarted;
  }
}
