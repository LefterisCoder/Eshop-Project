import { TestBed } from '@angular/core/testing';

import { CodeVerseFormService } from './code-verse-form.service';

describe('CodeVerseFormService', () => {
  let service: CodeVerseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeVerseFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
