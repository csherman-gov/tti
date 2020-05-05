import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRemediesPageComponent } from './hrt-remedies-page.component';

describe('HrtRemediesPageComponent', () => {
  let component: HrtRemediesPageComponent;
  let fixture: ComponentFixture<HrtRemediesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRemediesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRemediesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
