import { TestBed } from '@angular/core/testing';

import { MegamillionsService } from './megamillions.service';

describe('MegamillionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MegamillionsService = TestBed.get(MegamillionsService);
    expect(service).toBeTruthy();
  });
});
