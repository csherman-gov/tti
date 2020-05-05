import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtMediationPageComponent } from './hrt-mediation-page.component';

describe('HrtMediationPageComponent', () => {
  let component: HrtMediationPageComponent;
  let fixture: ComponentFixture<HrtMediationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtMediationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtMediationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
