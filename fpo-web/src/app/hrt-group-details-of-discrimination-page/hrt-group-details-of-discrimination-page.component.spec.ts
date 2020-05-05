import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupDetailsOfDiscriminationPageComponent } from './hrt-group-details-of-discrimination-page.component';

describe('HrtGroupDetailsOfDiscriminationPageComponent', () => {
  let component: HrtGroupDetailsOfDiscriminationPageComponent;
  let fixture: ComponentFixture<HrtGroupDetailsOfDiscriminationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupDetailsOfDiscriminationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupDetailsOfDiscriminationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
