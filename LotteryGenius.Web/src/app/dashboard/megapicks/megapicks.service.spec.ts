import { TestBed } from '@angular/core/testing';

import { MegapicksService } from './megapicks.service';

describe('MegapicksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MegapicksService = TestBed.get(MegapicksService);
    expect(service).toBeTruthy();
  });
});
