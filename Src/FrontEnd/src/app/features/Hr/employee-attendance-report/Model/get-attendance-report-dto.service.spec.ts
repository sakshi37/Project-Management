import { TestBed } from '@angular/core/testing';

import { GetAttendanceReportDtoService } from './get-attendance-report-dto.service';

describe('GetAttendanceReportDtoService', () => {
  let service: GetAttendanceReportDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAttendanceReportDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
