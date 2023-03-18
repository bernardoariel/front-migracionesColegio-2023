import { TestBed } from '@angular/core/testing';

import { EscribanosService } from './escribanos.service';

describe('EscribanosService', () => {
  let service: EscribanosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscribanosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
