import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupRespondentContactInformationPageComponent } from './hrt-group-respondent-contact-information-page.component';

describe('HrtGroupRespondentContactInformationPageComponent', () => {
  let component: HrtGroupRespondentContactInformationPageComponent;
  let fixture: ComponentFixture<HrtGroupRespondentContactInformationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupRespondentContactInformationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupRespondentContactInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
