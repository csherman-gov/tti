import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationThankYouPageComponent } from './hrt-retaliation-thank-you-page.component';

describe('HrtRetaliationThankYouPageComponent', () => {
  let component: HrtRetaliationThankYouPageComponent;
  let fixture: ComponentFixture<HrtRetaliationThankYouPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationThankYouPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationThankYouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
