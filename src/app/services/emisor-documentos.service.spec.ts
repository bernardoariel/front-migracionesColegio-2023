import { TestBed } from '@angular/core/testing';

import { EmisorDocumentosService } from './emisor-documentos.service';

describe('EmisorDocumentosService', () => {
  let service: EmisorDocumentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmisorDocumentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
