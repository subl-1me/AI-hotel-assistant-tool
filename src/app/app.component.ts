import { Component } from '@angular/core';
import { HomePageComponent } from './core/features/home/pages/home-page/home-page.component';
import { TestingToolbarComponent } from './core/shared/testing-components/testing-toolbar/testing-toolbar.component';

@Component({
  selector: 'app-root',
  imports: [HomePageComponent, TestingToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'hotel-AI-assistant2';
}
