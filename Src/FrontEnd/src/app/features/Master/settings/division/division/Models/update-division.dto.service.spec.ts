import { TestBed } from '@angular/core/testing';

import { UpdateDivisionDtoService } from './update-division.dto.service';

describe('UpdateDivisionDtoService', () => {
  let service: UpdateDivisionDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateDivisionDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
