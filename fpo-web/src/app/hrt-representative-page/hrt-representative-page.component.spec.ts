import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRepresentativePageComponent } from './hrt-representative-page.component';

describe('HrtRepresentativePageComponent', () => {
  let component: HrtRepresentativePageComponent;
  let fixture: ComponentFixture<HrtRepresentativePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRepresentativePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRepresentativePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
