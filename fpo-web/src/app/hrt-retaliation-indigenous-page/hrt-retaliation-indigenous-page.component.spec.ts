import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationIndigenousPageComponent } from './hrt-retaliation-indigenous-page.component';

describe('HrtRetaliationIndigenousPageComponent', () => {
  let component: HrtRetaliationIndigenousPageComponent;
  let fixture: ComponentFixture<HrtRetaliationIndigenousPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationIndigenousPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationIndigenousPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
