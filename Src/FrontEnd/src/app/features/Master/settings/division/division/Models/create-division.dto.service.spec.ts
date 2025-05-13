import { TestBed } from '@angular/core/testing';

import { CreateDivisionDtoService } from './create-division.dto.service';

describe('CreateDivisionDtoService', () => {
  let service: CreateDivisionDtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateDivisionDtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
