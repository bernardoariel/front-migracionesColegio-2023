import { TestBed } from '@angular/core/testing';

import { NacionalidadesService } from './nacionalidades.service';

describe('NacionalidadesService', () => {
  let service: NacionalidadesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NacionalidadesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
