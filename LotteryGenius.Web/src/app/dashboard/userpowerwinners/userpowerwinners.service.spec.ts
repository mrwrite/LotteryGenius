import { TestBed } from '@angular/core/testing';

import { UserpowerwinnersService } from './userpowerwinners.service';

describe('UserpowerwinnersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserpowerwinnersService = TestBed.get(UserpowerwinnersService);
    expect(service).toBeTruthy();
  });
});
