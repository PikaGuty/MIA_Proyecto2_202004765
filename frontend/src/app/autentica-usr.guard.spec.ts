import { TestBed } from '@angular/core/testing';

import { AutenticaUsrGuard } from './autentica-usr.guard';

describe('AutenticaUsrGuard', () => {
  let guard: AutenticaUsrGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutenticaUsrGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
