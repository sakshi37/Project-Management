import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesheetUpdateComponent } from './timesheet-update.component';

describe('TimesheetUpdateComponent', () => {
  let component: TimesheetUpdateComponent;
  let fixture: ComponentFixture<TimesheetUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimesheetUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
