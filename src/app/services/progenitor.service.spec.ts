import { TestBed } from '@angular/core/testing';

import { ProgenitorService } from './progenitor.service';

describe('ProgenitorService', () => {
  let service: ProgenitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgenitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
