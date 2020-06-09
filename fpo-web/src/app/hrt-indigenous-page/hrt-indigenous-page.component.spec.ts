import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtIndigenousPageComponent } from './hrt-indigenous-page.component';

describe('HrtIndigenousPageComponent', () => {
  let component: HrtIndigenousPageComponent;
  let fixture: ComponentFixture<HrtIndigenousPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtIndigenousPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtIndigenousPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
