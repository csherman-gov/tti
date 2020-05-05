import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationHomePageComponent } from './hrt-retaliation-home-page.component';

describe('HrtRetaliationHomePageComponent', () => {
  let component: HrtRetaliationHomePageComponent;
  let fixture: ComponentFixture<HrtRetaliationHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
