import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiAssistantListenerComponent } from './ai-assistant-listener.component';

describe('AiAssistantListenerComponent', () => {
  let component: AiAssistantListenerComponent;
  let fixture: ComponentFixture<AiAssistantListenerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiAssistantListenerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiAssistantListenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
