import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationRemediesPageComponent } from './hrt-retaliation-remedies-page.component';

describe('HrtRetaliationRemediesPageComponent', () => {
  let component: HrtRetaliationRemediesPageComponent;
  let fixture: ComponentFixture<HrtRetaliationRemediesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationRemediesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationRemediesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
