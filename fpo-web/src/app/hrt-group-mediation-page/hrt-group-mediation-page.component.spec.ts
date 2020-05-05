import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupMediationPageComponent } from './hrt-group-mediation-page.component';

describe('HrtGroupMediationPageComponent', () => {
  let component: HrtGroupMediationPageComponent;
  let fixture: ComponentFixture<HrtGroupMediationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupMediationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupMediationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
