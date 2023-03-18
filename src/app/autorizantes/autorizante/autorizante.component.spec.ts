import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizanteComponent } from './autorizante.component';

describe('AutorizanteComponent', () => {
  let component: AutorizanteComponent;
  let fixture: ComponentFixture<AutorizanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutorizanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutorizanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
