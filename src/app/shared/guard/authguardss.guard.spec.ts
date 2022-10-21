import { TestBed } from '@angular/core/testing';

import { AuthguardssGuard } from './authguardss.guard';

describe('AuthguardssGuard', () => {
  let guard: AuthguardssGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthguardssGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
