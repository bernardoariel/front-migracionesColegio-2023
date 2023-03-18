import { TestBed } from '@angular/core/testing';

import { AcompaneantesService } from './acompaneantes.service';

describe('AcompaneantesService', () => {
  let service: AcompaneantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcompaneantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
