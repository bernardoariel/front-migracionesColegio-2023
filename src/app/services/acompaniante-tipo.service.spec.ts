import { TestBed } from '@angular/core/testing';

import { AcompanianteTipoService } from './acompaniante-tipo.service';

describe('AcompanianteTipoService', () => {
  let service: AcompanianteTipoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcompanianteTipoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
