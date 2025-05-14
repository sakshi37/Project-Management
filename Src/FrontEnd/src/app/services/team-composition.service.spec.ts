import { TestBed } from '@angular/core/testing';

import { TeamCompositionService } from './team-composition.service';

describe('TeamCompositionService', () => {
  let service: TeamCompositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamCompositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
