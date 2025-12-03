import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionBubbleComponent } from './suggestion-bubble.component';

describe('SuggestionBubbleComponent', () => {
  let component: SuggestionBubbleComponent;
  let fixture: ComponentFixture<SuggestionBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestionBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestionBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
