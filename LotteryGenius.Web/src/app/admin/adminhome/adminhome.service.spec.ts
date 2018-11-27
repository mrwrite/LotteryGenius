import { TestBed } from '@angular/core/testing';

import { AdminhomeService } from './adminhome.service';

describe('AdminhomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminhomeService = TestBed.get(AdminhomeService);
    expect(service).toBeTruthy();
  });
});
