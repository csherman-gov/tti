import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupRepresentativeComponent } from './hrt-group-representative.component';

describe('HrtGroupRepresentativeComponent', () => {
  let component: HrtGroupRepresentativeComponent;
  let fixture: ComponentFixture<HrtGroupRepresentativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupRepresentativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
