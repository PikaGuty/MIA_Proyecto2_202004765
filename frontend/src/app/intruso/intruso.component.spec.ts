import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntrusoComponent } from './intruso.component';

describe('IntrusoComponent', () => {
  let component: IntrusoComponent;
  let fixture: ComponentFixture<IntrusoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IntrusoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IntrusoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
