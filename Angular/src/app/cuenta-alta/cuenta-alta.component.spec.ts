import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaAltaComponent } from './cuenta-alta.component';

describe('CuentaAltaComponent', () => {
  let component: CuentaAltaComponent;
  let fixture: ComponentFixture<CuentaAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuentaAltaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
