import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProgenitorComponent } from './form-progenitor.component';

describe('FormProgenitorComponent', () => {
  let component: FormProgenitorComponent;
  let fixture: ComponentFixture<FormProgenitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProgenitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProgenitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
