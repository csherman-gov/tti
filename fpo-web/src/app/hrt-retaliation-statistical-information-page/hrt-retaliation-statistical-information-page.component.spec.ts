import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationStatisticalInformationPageComponent } from './hrt-retaliation-statistical-information-page.component';

describe('HrtRetaliationStatisticalInformationPageComponent', () => {
  let component: HrtRetaliationStatisticalInformationPageComponent;
  let fixture: ComponentFixture<HrtRetaliationStatisticalInformationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationStatisticalInformationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationStatisticalInformationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
