import { TestBed } from '@angular/core/testing';

import { HashvaultService } from './hashvault.service';

describe('HashvaultService', () => {
  let service: HashvaultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HashvaultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
