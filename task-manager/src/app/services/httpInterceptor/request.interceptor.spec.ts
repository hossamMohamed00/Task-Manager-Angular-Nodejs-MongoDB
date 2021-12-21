import { TestBed } from '@angular/core/testing';

import { RequestInterceptor } from './request.interceptor';

describe('HttpInterceptorService', () => {
  let service: RequestInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
