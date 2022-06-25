import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaHabilitarComponent } from './cuenta-habilitar.component';

describe('CuentaHabilitarComponent', () => {
  let component: CuentaHabilitarComponent;
  let fixture: ComponentFixture<CuentaHabilitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaHabilitarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaHabilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
