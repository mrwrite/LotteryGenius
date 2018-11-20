import { TestBed } from '@angular/core/testing';

import { UsermegapicksService } from './usermegapicks.service';

describe('UsermegapicksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsermegapicksService = TestBed.get(UsermegapicksService);
    expect(service).toBeTruthy();
  });
});
