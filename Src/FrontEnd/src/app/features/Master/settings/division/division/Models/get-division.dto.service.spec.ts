import { TestBed } from '@angular/core/testing';

import { GetDivisionDtoService } from './get-division.dto.service';

describe('GetDivisionDtoService', () => {
  let service: GetDivisionDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDivisionDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
