import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtLateComplaintsPageComponent } from './hrt-late-complaints-page.component';

describe('HrtLateComplaintsPageComponent', () => {
  let component: HrtLateComplaintsPageComponent;
  let fixture: ComponentFixture<HrtLateComplaintsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtLateComplaintsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtLateComplaintsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
