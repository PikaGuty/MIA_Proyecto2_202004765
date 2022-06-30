import { TestBed } from '@angular/core/testing';

import { AutenticaAdminGuard } from './autentica-admin.guard';

describe('AutenticaAdminGuard', () => {
  let guard: AutenticaAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AutenticaAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
