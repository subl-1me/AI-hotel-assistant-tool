import { Component } from '@angular/core';
import { SuggestionBubbleComponent } from '../../components/suggestion-bubble/suggestion-bubble.component';
import { AiBubbleComponent } from '../../components/ai-bubble/ai-bubble/ai-bubble.component';

@Component({
  selector: 'app-home-page',
  imports: [SuggestionBubbleComponent, AiBubbleComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {}
