import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtProgressPageComponent } from './hrt-progress-page.component';

describe('HrtProgressPageComponent', () => {
  let component: HrtProgressPageComponent;
  let fixture: ComponentFixture<HrtProgressPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtProgressPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtProgressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
