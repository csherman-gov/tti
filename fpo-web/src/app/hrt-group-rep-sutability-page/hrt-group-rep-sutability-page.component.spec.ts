import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupRepSutabilityPageComponent } from './hrt-group-rep-sutability-page.component';

describe('HrtGroupRepSutabilityPageComponent', () => {
  let component: HrtGroupRepSutabilityPageComponent;
  let fixture: ComponentFixture<HrtGroupRepSutabilityPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupRepSutabilityPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupRepSutabilityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
