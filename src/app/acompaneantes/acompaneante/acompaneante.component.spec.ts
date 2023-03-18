import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompaneanteComponent } from './acompaneante.component';

describe('AcompaneanteComponent', () => {
  let component: AcompaneanteComponent;
  let fixture: ComponentFixture<AcompaneanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompaneanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcompaneanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
