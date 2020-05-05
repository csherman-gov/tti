import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrtComplaintFileInTimePageComponent } from './hrt-complaint-file-in-time-page.component';

describe('HrtComplaintFileInTimePageComponent', () => {
  let component: HrtComplaintFileInTimePageComponent;
  let fixture: ComponentFixture<HrtComplaintFileInTimePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrtComplaintFileInTimePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrtComplaintFileInTimePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
