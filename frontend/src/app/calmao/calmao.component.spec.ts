import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalmaoComponent } from './calmao.component';

describe('CalmaoComponent', () => {
  let component: CalmaoComponent;
  let fixture: ComponentFixture<CalmaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalmaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalmaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
