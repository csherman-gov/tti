import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupThankYouPageComponent } from './hrt-group-thank-you-page.component';

describe('HrtGroupThankYouPageComponent', () => {
  let component: HrtGroupThankYouPageComponent;
  let fixture: ComponentFixture<HrtGroupThankYouPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupThankYouPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupThankYouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
