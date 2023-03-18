import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgenitorComponent } from './progenitor.component';

describe('ProgenitorComponent', () => {
  let component: ProgenitorComponent;
  let fixture: ComponentFixture<ProgenitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgenitorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgenitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
