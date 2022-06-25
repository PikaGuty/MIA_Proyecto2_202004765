import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaBajaComponent } from './cuenta-baja.component';

describe('CuentaBajaComponent', () => {
  let component: CuentaBajaComponent;
  let fixture: ComponentFixture<CuentaBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaBajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
