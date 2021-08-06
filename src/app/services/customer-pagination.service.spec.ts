import { TestBed } from '@angular/core/testing';

import { CustomerPaginationService } from './customer-pagination.service';

describe('CustomerPaginationService', () => {
  let service: CustomerPaginationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerPaginationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
