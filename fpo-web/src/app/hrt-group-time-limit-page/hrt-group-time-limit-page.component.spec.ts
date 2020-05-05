import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupTimeLimitPageComponent } from './hrt-group-time-limit-page.component';

describe('HrtGroupTimeLimitPageComponent', () => {
  let component: HrtGroupTimeLimitPageComponent;
  let fixture: ComponentFixture<HrtGroupTimeLimitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupTimeLimitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupTimeLimitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
