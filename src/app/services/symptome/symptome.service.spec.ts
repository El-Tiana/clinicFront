import { TestBed } from '@angular/core/testing';

import { SymptomeService } from './symptome.service';

describe('SymptomeService', () => {
  let service: SymptomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SymptomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
