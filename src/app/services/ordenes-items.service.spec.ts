import { TestBed } from '@angular/core/testing';

import { OrdenesItemsService } from './ordenes-items.service';

describe('OrdenesItemsService', () => {
  let service: OrdenesItemsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenesItemsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
