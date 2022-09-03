import { TestBed } from '@angular/core/testing';

import { LipService } from './lip.service';

describe('LipService', () => {
  let service: LipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
