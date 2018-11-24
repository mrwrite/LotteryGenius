import { TestBed } from '@angular/core/testing';

import { HomesettingsService } from './homesettings.service';

describe('HomesettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomesettingsService = TestBed.get(HomesettingsService);
    expect(service).toBeTruthy();
  });
});
