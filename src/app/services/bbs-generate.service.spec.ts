import { TestBed } from '@angular/core/testing';

import { BbsGenerateService } from './bbs-generate.service';

describe('BbsGenerateService', () => {
  let service: BbsGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BbsGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
