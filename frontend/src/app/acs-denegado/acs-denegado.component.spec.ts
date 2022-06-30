import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcsDenegadoComponent } from './acs-denegado.component';

describe('AcsDenegadoComponent', () => {
  let component: AcsDenegadoComponent;
  let fixture: ComponentFixture<AcsDenegadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcsDenegadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcsDenegadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
