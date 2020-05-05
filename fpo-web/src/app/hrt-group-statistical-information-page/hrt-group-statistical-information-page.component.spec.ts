import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupStatisticalInformationPageComponent } from './hrt-group-statistical-information-page.component';

describe('HrtGroupStatisticalInformationPageComponent', () => {
  let component: HrtGroupStatisticalInformationPageComponent;
  let fixture: ComponentFixture<HrtGroupStatisticalInformationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupStatisticalInformationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupStatisticalInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
