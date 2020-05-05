import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationProgressPageComponent } from './hrt-retaliation-progress-page.component';

describe('HrtRetaliationProgressPageComponent', () => {
  let component: HrtRetaliationProgressPageComponent;
  let fixture: ComponentFixture<HrtRetaliationProgressPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationProgressPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationProgressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
