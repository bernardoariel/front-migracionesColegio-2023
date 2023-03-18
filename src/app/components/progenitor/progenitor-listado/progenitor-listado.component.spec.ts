import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgenitorListadoComponent } from './progenitor-listado.component';

describe('ProgenitorListadoComponent', () => {
  let component: ProgenitorListadoComponent;
  let fixture: ComponentFixture<ProgenitorListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgenitorListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgenitorListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
