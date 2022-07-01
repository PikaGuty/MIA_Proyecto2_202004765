import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoArchComponent } from './info-arch.component';

describe('InfoArchComponent', () => {
  let component: InfoArchComponent;
  let fixture: ComponentFixture<InfoArchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoArchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoArchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
