import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationDetailsOfTheRetaliationPageComponent } from './hrt-retaliation-details-of-the-retaliation-page.component';

describe('HrtRetaliationDetailsOfTheRetaliationPageComponent', () => {
  let component: HrtRetaliationDetailsOfTheRetaliationPageComponent;
  let fixture: ComponentFixture<HrtRetaliationDetailsOfTheRetaliationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationDetailsOfTheRetaliationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationDetailsOfTheRetaliationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
