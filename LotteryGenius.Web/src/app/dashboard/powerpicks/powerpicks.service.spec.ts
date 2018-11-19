import { TestBed } from '@angular/core/testing';

import { PowerpicksService } from './powerpicks.service';

describe('PowerpicksService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PowerpicksService = TestBed.get(PowerpicksService);
    expect(service).toBeTruthy();
  });
});
