import { TestBed } from '@angular/core/testing';

import { Admins } from './admins';

describe('Admins', () => {
  let service: Admins;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Admins);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
