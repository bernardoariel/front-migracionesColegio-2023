import { TestBed } from '@angular/core/testing';

import { MenoresService } from './menores.service';

describe('MenoresService', () => {
  let service: MenoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
