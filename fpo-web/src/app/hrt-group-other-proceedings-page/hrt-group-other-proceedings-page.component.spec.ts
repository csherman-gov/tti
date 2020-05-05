import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupOtherProceedingsPageComponent } from './hrt-group-other-proceedings-page.component';

describe('HrtGroupOtherProceedingsPageComponent', () => {
  let component: HrtGroupOtherProceedingsPageComponent;
  let fixture: ComponentFixture<HrtGroupOtherProceedingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupOtherProceedingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupOtherProceedingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
