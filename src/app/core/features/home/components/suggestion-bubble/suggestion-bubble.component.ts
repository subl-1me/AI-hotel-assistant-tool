import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-suggestion-bubble',
  imports: [],
  templateUrl: './suggestion-bubble.component.html',
  styleUrl: './suggestion-bubble.component.css',
})
export class SuggestionBubbleComponent {
  @Input() suggestionText: string = '';
}
