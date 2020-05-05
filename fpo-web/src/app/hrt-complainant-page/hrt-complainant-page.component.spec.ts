import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtComplainantPageComponent } from './hrt-complainant-page.component';

describe('HrtComplainantPageComponent', () => {
  let component: HrtComplainantPageComponent;
  let fixture: ComponentFixture<HrtComplainantPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtComplainantPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtComplainantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
