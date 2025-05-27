import { TestBed } from '@angular/core/testing';

import { ParticularEmployeeService } from './particular-employee.service';

describe('ParticularEmployeeService', () => {
  let service: ParticularEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticularEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
