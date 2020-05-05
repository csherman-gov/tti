import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationReviewPageComponent } from './hrt-retaliation-review-page.component';

describe('HrtRetaliationReviewPageComponent', () => {
  let component: HrtRetaliationReviewPageComponent;
  let fixture: ComponentFixture<HrtRetaliationReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationReviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
