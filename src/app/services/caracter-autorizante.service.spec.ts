import { TestBed } from '@angular/core/testing';

import { CaracterAutorizanteService } from './caracter-autorizante.service';

describe('CaracterAutorizanteService', () => {
  let service: CaracterAutorizanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracterAutorizanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
