import { TestBed } from '@angular/core/testing';

import { ArtTsService } from './art.ts.service';

describe('ArtTsService', () => {
  let service: ArtTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
