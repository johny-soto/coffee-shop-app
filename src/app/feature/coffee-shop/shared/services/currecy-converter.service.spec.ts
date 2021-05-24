import { TestBed } from '@angular/core/testing';

import { CurrecyService } from './currecy-converter.service';

describe('CurrecyConverterService', () => {
  let service: CurrecyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrecyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
