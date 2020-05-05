import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationRoleInComplaintPageComponent } from './hrt-retaliation-role-in-complaint-page.component';

describe('HrtRetaliationRoleInComplaintPageComponent', () => {
  let component: HrtRetaliationRoleInComplaintPageComponent;
  let fixture: ComponentFixture<HrtRetaliationRoleInComplaintPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationRoleInComplaintPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationRoleInComplaintPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
