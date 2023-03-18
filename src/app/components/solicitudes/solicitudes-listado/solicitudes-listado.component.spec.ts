import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesListadoComponent } from './solicitudes-listado.component';

describe('SolicitudesListadoComponent', () => {
  let component: SolicitudesListadoComponent;
  let fixture: ComponentFixture<SolicitudesListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
