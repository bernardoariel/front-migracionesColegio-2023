import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorSolicitudesComponent } from './buscador-solicitudes.component';

describe('BuscadorSolicitudesComponent', () => {
  let component: BuscadorSolicitudesComponent;
  let fixture: ComponentFixture<BuscadorSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorSolicitudesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscadorSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
