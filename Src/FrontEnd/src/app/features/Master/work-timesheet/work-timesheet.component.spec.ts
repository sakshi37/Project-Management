import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimesheetComponent } from './work-timesheet.component';

describe('WorkTimesheetComponent', () => {
  let component: WorkTimesheetComponent;
  let fixture: ComponentFixture<WorkTimesheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkTimesheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
