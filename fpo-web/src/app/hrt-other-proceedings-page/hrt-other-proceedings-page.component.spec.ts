import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtOtherProceedingsPageComponent } from './hrt-other-proceedings-page.component';

describe('HrtOtherProceedingsPageComponent', () => {
  let component: HrtOtherProceedingsPageComponent;
  let fixture: ComponentFixture<HrtOtherProceedingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtOtherProceedingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtOtherProceedingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
