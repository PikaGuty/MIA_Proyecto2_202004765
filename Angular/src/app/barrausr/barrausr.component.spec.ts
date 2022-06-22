import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrausrComponent } from './barrausr.component';

describe('BarrausrComponent', () => {
  let component: BarrausrComponent;
  let fixture: ComponentFixture<BarrausrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarrausrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrausrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
