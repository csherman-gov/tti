import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRespondentsPageComponent } from './hrt-respondents-page.component';

describe('HrtRespondentsPageComponent', () => {
  let component: HrtRespondentsPageComponent;
  let fixture: ComponentFixture<HrtRespondentsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRespondentsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRespondentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
