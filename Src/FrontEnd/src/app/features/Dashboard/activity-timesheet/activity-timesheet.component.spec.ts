import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTimesheetComponent } from './activity-timesheet.component';

describe('ActivityTimesheetComponent', () => {
  let component: ActivityTimesheetComponent;
  let fixture: ComponentFixture<ActivityTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivityTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
