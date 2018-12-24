import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Suggestion } from './Suggestion';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const suggestions = [
      { id: 11, name: 'Mr. Nice', likeCount: 0 },
      { id: 12, name: 'Narco', likeCount: 0  },
      { id: 13, name: 'Bombasto', likeCount: 0  },
      { id: 14, name: 'Celeritas', likeCount: 0  },
      { id: 15, name: 'Magneta', likeCount: 0  },
      { id: 16, name: 'RubberMan', likeCount: 0  },
      { id: 17, name: 'Dynama', likeCount: 0  },
      { id: 18, name: 'Dr IQ', likeCount: 0  },
      { id: 19, name: 'Magma', likeCount: 0  },
      { id: 20, name: 'Tornado', likeCount: 0  }
    ];
    return { suggestions };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(suggestions: Suggestion[]): number {
    return suggestions.length > 0 ? Math.max(...suggestions.map(suggestion => suggestion.id)) + 1 : 11;
  }
}