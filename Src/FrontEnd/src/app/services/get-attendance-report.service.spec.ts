import { TestBed } from '@angular/core/testing';

import { GetAttendanceReportService } from './get-attendance-report.service';

describe('GetAttendanceReportService', () => {
  let service: GetAttendanceReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAttendanceReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
