import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBoardUpdateComponent } from './test-board-update.component';

describe('TestBoardUpdateComponent', () => {
  let component: TestBoardUpdateComponent;
  let fixture: ComponentFixture<TestBoardUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestBoardUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestBoardUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
