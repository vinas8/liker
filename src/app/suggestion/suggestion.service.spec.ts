import { TestBed } from '@angular/core/testing';
import {
  RouterTestingModule
} from '@angular/router/testing';

import { SuggestionService } from './suggestion.service';
import { SuggestionComponent } from './suggestion.component';

describe('SuggestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({

    imports: [
      RouterTestingModule.withRoutes([
          {
              path: 'suggestions',
              component: SuggestionComponent
          }
      ]),
    ]
  }));

  it('should be created', () => {
    const service: SuggestionService = TestBed.get(SuggestionService);
    expect(service).toBeTruthy();
  });
});
