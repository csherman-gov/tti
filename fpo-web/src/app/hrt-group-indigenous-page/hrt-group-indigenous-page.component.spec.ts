import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupIndigenousPageComponent } from './hrt-group-indigenous-page.component';

describe('HrtGroupIndigenousPageComponent', () => {
  let component: HrtGroupIndigenousPageComponent;
  let fixture: ComponentFixture<HrtGroupIndigenousPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupIndigenousPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupIndigenousPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
