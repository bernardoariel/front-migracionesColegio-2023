import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribanoComponent } from './escribano.component';

describe('EscribanoComponent', () => {
  let component: EscribanoComponent;
  let fixture: ComponentFixture<EscribanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EscribanoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EscribanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
