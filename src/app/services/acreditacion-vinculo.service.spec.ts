import { TestBed } from '@angular/core/testing';

import { AcreditacionVinculoService } from './acreditacion-vinculo.service';

describe('AcreditacionVinculoService', () => {
  let service: AcreditacionVinculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcreditacionVinculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
