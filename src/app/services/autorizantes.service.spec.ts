import { TestBed } from '@angular/core/testing';

import { AutorizantesService } from './autorizantes.service';

describe('AutorizantesService', () => {
  let service: AutorizantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutorizantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
