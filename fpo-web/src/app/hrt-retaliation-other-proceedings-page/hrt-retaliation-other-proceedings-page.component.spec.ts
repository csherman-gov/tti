import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationOtherProceedingsPageComponent } from './hrt-retaliation-other-proceedings-page.component';

describe('HrtRetaliationOtherProceedingsPageComponent', () => {
  let component: HrtRetaliationOtherProceedingsPageComponent;
  let fixture: ComponentFixture<HrtRetaliationOtherProceedingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationOtherProceedingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationOtherProceedingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
