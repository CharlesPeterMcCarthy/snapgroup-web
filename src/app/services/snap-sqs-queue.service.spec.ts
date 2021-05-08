import { TestBed } from '@angular/core/testing';

import { SnapSqsQueueService } from './snap-sqs-queue.service';

describe('SnapSqsQueueService', () => {
  let service: SnapSqsQueueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapSqsQueueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
