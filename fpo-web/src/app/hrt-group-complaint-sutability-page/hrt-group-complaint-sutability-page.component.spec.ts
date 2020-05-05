import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupComplaintSutabilityPageComponent } from './hrt-group-complaint-sutability-page.component';

describe('HrtGroupComplaintSutabilityPageComponent', () => {
  let component: HrtGroupComplaintSutabilityPageComponent;
  let fixture: ComponentFixture<HrtGroupComplaintSutabilityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupComplaintSutabilityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupComplaintSutabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
