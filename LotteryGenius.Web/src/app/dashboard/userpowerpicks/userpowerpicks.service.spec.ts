import { TestBed } from '@angular/core/testing';

import { UserpowerpicksService } from './userpowerpicks.service';

describe('UserpowerpicksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserpowerpicksService = TestBed.get(UserpowerpicksService);
    expect(service).toBeTruthy();
  });
});
