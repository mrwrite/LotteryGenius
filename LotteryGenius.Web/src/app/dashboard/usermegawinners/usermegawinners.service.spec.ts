import { TestBed } from '@angular/core/testing';

import { UsermegawinnersService } from './usermegawinners.service';

describe('UsermegawinnersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsermegawinnersService = TestBed.get(UsermegawinnersService);
    expect(service).toBeTruthy();
  });
});
