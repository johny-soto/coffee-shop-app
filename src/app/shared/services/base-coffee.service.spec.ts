import { TestBed } from '@angular/core/testing';

import { BaseCoffeeService } from './base-coffee.service';

describe('BaseCoffeeService', () => {
  let service: BaseCoffeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseCoffeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
