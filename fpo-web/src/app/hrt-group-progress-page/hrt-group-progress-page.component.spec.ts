import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupProgressPageComponent } from './hrt-group-progress-page.component';

describe('HrtGroupProgressPageComponent', () => {
  let component: HrtGroupProgressPageComponent;
  let fixture: ComponentFixture<HrtGroupProgressPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupProgressPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupProgressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
