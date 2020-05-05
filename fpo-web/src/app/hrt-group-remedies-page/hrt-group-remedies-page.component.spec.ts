import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupRemediesPageComponent } from './hrt-group-remedies-page.component';

describe('HrtGroupRemediesPageComponent', () => {
  let component: HrtGroupRemediesPageComponent;
  let fixture: ComponentFixture<HrtGroupRemediesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupRemediesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupRemediesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
