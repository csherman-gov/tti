import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtRetaliationFileInTimePageComponent } from './hrt-retaliation-file-in-time-page.component';

describe('HrtRetaliationFileInTimePageComponent', () => {
  let component: HrtRetaliationFileInTimePageComponent;
  let fixture: ComponentFixture<HrtRetaliationFileInTimePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtRetaliationFileInTimePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtRetaliationFileInTimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
