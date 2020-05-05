import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtStatisticalInformationPageComponent } from './hrt-statistical-information-page.component';

describe('HrtStatisticalInformationPageComponent', () => {
  let component: HrtStatisticalInformationPageComponent;
  let fixture: ComponentFixture<HrtStatisticalInformationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtStatisticalInformationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtStatisticalInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
