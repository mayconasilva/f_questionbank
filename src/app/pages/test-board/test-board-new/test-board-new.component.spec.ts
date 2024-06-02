import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBoardNewComponent } from './test-board-new.component';

describe('TestBoardNewComponent', () => {
  let component: TestBoardNewComponent;
  let fixture: ComponentFixture<TestBoardNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBoardNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBoardNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
