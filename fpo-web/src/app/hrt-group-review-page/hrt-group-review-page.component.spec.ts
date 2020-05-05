import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupReviewPageComponent } from './hrt-group-review-page.component';

describe('HrtGroupReviewPageComponent', () => {
  let component: HrtGroupReviewPageComponent;
  let fixture: ComponentFixture<HrtGroupReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupReviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
