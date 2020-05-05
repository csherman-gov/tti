import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupHomePageComponent } from './hrt-group-home-page.component';

describe('HrtGroupHomePageComponent', () => {
  let component: HrtGroupHomePageComponent;
  let fixture: ComponentFixture<HrtGroupHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
