import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpPropietarioComponent } from './pop-up-propietario.component';

describe('PopUpPropietarioComponent', () => {
  let component: PopUpPropietarioComponent;
  let fixture: ComponentFixture<PopUpPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpPropietarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
