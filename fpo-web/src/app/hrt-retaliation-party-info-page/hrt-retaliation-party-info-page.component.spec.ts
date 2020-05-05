import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationPartyInfoPageComponent } from './hrt-retaliation-party-info-page.component';

describe('HrtRetaliationPartyInfoPageComponent', () => {
  let component: HrtRetaliationPartyInfoPageComponent;
  let fixture: ComponentFixture<HrtRetaliationPartyInfoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationPartyInfoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationPartyInfoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
