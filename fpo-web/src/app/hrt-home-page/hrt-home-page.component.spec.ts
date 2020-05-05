import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtHomePageComponent } from './hrt-home-page.component';

describe('HrtHomePageComponent', () => {
  let component: HrtHomePageComponent;
  let fixture: ComponentFixture<HrtHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
