import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtReviewPageComponent } from './hrt-review-page.component';

describe('HrtReviewPageComponent', () => {
  let component: HrtReviewPageComponent;
  let fixture: ComponentFixture<HrtReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtReviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
