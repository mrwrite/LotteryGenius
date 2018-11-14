import { TestBed } from '@angular/core/testing';

import { PowerballService } from './powerball.service';

describe('PowerballService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PowerballService = TestBed.get(PowerballService);
    expect(service).toBeTruthy();
  });
});
