import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtDetailsOfTheDiscriminationPageComponent } from './hrt-details-of-the-discrimination-page.component';

describe('HrtDetailsOfTheDiscriminationPageComponent', () => {
  let component: HrtDetailsOfTheDiscriminationPageComponent;
  let fixture: ComponentFixture<HrtDetailsOfTheDiscriminationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtDetailsOfTheDiscriminationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtDetailsOfTheDiscriminationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
