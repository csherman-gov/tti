import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationMediationPageComponent } from './hrt-retaliation-mediation-page.component';

describe('HrtRetaliationMediationPageComponent', () => {
  let component: HrtRetaliationMediationPageComponent;
  let fixture: ComponentFixture<HrtRetaliationMediationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationMediationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationMediationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
