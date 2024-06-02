import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBoardEditComponent } from './test-board-edit.component';

describe('TestBoardEditComponent', () => {
  let component: TestBoardEditComponent;
  let fixture: ComponentFixture<TestBoardEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBoardEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBoardEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
