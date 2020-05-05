import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtThankYouPageComponent } from './hrt-thank-you-page.component';

describe('HrtThankYouPageComponent', () => {
  let component: HrtThankYouPageComponent;
  let fixture: ComponentFixture<HrtThankYouPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtThankYouPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtThankYouPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
