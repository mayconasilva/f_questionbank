import { TestBed } from '@angular/core/testing';

import { TestBoardService } from './test-board.service';

describe('TestBoardService', () => {
  let service: TestBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
