import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtOtherRelatedProceedingsPageComponent } from './hrt-other-related-proceedings-page.component';

describe('HrtOtherRelatedProceedingsPageComponent', () => {
  let component: HrtOtherRelatedProceedingsPageComponent;
  let fixture: ComponentFixture<HrtOtherRelatedProceedingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtOtherRelatedProceedingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtOtherRelatedProceedingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
