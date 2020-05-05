import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtGroupAreaAndDiscriminationPageComponent } from './hrt-group-area-and-discrimination-page.component';

describe('HrtGroupAreaAndDiscriminationPageComponent', () => {
  let component: HrtGroupAreaAndDiscriminationPageComponent;
  let fixture: ComponentFixture<HrtGroupAreaAndDiscriminationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtGroupAreaAndDiscriminationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtGroupAreaAndDiscriminationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
