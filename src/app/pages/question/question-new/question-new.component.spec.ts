import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionNewComponent } from './question-new.component';

describe('QuestionNewComponent', () => {
  let component: QuestionNewComponent;
  let fixture: ComponentFixture<QuestionNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QuestionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
