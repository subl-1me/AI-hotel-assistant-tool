import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingToolbarComponent } from './testing-toolbar.component';

describe('TestingToolbarComponent', () => {
  let component: TestingToolbarComponent;
  let fixture: ComponentFixture<TestingToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestingToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestingToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
