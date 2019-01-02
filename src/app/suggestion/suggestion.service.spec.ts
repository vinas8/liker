import { inject, TestBed } from '@angular/core/testing'
import { HttpClientModule, HttpErrorResponse, HttpRequest } from '@angular/common/http'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { suggestionsUrl, SuggestionService } from './suggestion.service'
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


describe('Service: SuggestionService', () => {
  let service: SuggestionService
  let backend: HttpTestingController

  class SomeService {
    getValue = function() {};
  }

  const FirestoreStub = {
    collection: (name: string) => ({
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({ foo: 'bar' }),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      }),
    }),
  };

  const expectedData = {
    id: 1,
    name: 'Test suggestion',
  }

  const expectedDataAll = [
    {
      id: 1,
      name: 'Test suggestion 1'
    },
    {
      id: 2,
      name: 'Test suggestion 2'
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        SuggestionService,
        { provide: AngularFirestore, useValue: FirestoreStub },
      ],
    })

    backend = TestBed.get(HttpTestingController)
    service = TestBed.get(SuggestionService)

    // Mock implementation of console.error to
    // return undefined to stop printing out to console log during test
    jest.spyOn(console, 'error').mockImplementation(() => undefined)
  })

  afterEach(inject([ HttpTestingController ], (_backend: HttpTestingController) => {
    _backend.verify()
  }))

  it('should create an instance successfully', () => {
    expect(service).toBeDefined()
  })

  it('should call the GET suggestion api and return all results', () => {
    let actualDataAll = {}

    service.getSuggestions().subscribe(data => actualDataAll = data)

    backend.expectOne((req: HttpRequest<any>) => {
      return req.url === `${suggestionsUrl}`
        && req.method === 'GET'
    }, `GET all suggestion data from ${suggestionsUrl}`)
      .flush(expectedDataAll)

    expect(actualDataAll).toEqual(expectedDataAll)
  })

  // it('should call the GET hero api and return the result', () => {
  //   let actualData = {}

  //   service.getSuggestion(1).subscribe(data => actualData = data)

  //   backend.expectOne((req: HttpRequest<any>) => {
  //     return req.url === `${suggestionsUrl}`
  //       && req.method === 'GET'
  //       && req.params.get('id') === '1'
  //   }, `GET hero data from ${suggestionsUrl}?id=1`)
  //     .flush(expectedData)

  //   expect(actualData).toEqual(expectedData)
  // })

  // it('should send an expected GET request and throw error to console when an error occurs', () => {
  //   service.getSuggestion(1).subscribe()

  //   const getSuggestionRequest = backend.expectOne((req: HttpRequest<any>) => {
  //     return req.url === `${suggestionsUrl}`
  //       && req.method === 'GET'
  //       && req.params.get('id') === '1'
  //   }, `GET hero data from ${suggestionsUrl}?id=1`)

  //   // Stimulate an error happens from the backend
  //   getSuggestionRequest.error(new ErrorEvent('ERROR_GET_HERO_DATA'))

  //   expect(console.error).toHaveBeenCalled()
  // })

  // it('should return an observable of undefined and print error to console', () => {
  //   const result = service.handleError(new HttpErrorResponse({ error: 'Error occurs' }), 'test method')

  //   expect(console.error).toHaveBeenCalled()
  //   result.subscribe(value => expect(value).toBeUndefined())
  // })
})
