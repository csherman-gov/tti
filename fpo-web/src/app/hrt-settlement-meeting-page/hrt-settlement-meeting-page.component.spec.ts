import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtSettlementMeetingPageComponent } from './hrt-settlement-meeting-page.component';

describe('HrtSettlementMeetingPageComponent', () => {
  let component: HrtSettlementMeetingPageComponent;
  let fixture: ComponentFixture<HrtSettlementMeetingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtSettlementMeetingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtSettlementMeetingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
