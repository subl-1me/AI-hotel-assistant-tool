import { Component } from '@angular/core';
import { HomePageComponent } from './core/features/home/pages/home-page/home-page.component';

@Component({
  selector: 'app-root',
  imports: [HomePageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hotel-AI-assistant2';
}
