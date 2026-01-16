import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ai-assistant-listener',
  imports: [NgIf],
  templateUrl: './ai-assistant-listener.component.html',
  styleUrl: './ai-assistant-listener.component.css',
})
export class AiAssistantListenerComponent implements OnInit {
  public contextRoute: string = '';

  constructor(private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {
    this.contextRoute = this.getCurrentRoute();
  }

  private getCurrentRoute(): string {
    return this.activatedRouter.snapshot.routeConfig?.path || '';
  }
}
