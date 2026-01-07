import { Component } from '@angular/core';
import { HomePageComponent } from './core/features/home/pages/home-page/home-page.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hotel-AI-assistant2';
}
