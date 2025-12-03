import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiBubbleComponent } from './ai-bubble.component';

describe('AiBubbleComponent', () => {
  let component: AiBubbleComponent;
  let fixture: ComponentFixture<AiBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiBubbleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
