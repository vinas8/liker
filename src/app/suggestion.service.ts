import { Injectable } from '@angular/core';
import { Suggestion } from './Suggestion'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';

// interface Suggestion {
//   id?: string;
//   name: string;
//   likeCount: number
// }

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {

  // private notesCollection: AngularFirestoreCollection<Suggestion>
  // notes: Observable<Suggestion[]>;

  private suggestionsUrl = 'api/suggestions';
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private db: AngularFirestore) { }

  getSuggestions(): any {
    let value = this.db.collection('suggestions', ref => {
      return ref.orderBy('likeCount', 'desc')
    })

    let snapshot = value.snapshotChanges();
    // this.messageService.add('SuggestionService: fetched suggestions')
    //Applying the optional type specifier, <Hero[]> , gives you a typed result object.
    console.log(snapshot)
    return value.valueChanges();
  }

    /** GET hero by id. Will 404 if id not found */
  getSuggestion(id: number): Observable<Suggestion> {
    // this.messageService.add(`SuggestionService: fetched suggestion id =${id}`)
    const url = `${this.suggestionsUrl}/${id}`;
    return this.http.get<Suggestion>(url).pipe(
      tap(_ => this.log(`fetched suggestion id=${id}`)),
      catchError(this.handleError<Suggestion>(`getSuggestion id=${id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SuggestionService: ${message}`);
  }

    /** PUT: update the hero on the server */
  updateSuggestion (suggestion: Suggestion): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(this.suggestionsUrl, suggestion, httpOptions).pipe(
      tap(_ => this.log(`updated suggestion id=${suggestion.id}`)),
      catchError(this.handleError<any>('updateSuggestion'))
    );
  }

  /** POST: add a new hero to the server */
addSuggestion (suggestion: Suggestion): Observable<Suggestion> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.post<Suggestion>(this.suggestionsUrl, suggestion, httpOptions).pipe(
    tap((suggestion: Suggestion) => this.log(`added suggestion w/ id=${suggestion.id}`)),
    catchError(this.handleError<Suggestion>('addSuggestion'))
  );
}

/** DELETE: delete the hero from the server */
deleteSuggestion (suggestion: Suggestion | number): Observable<Suggestion> {
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  const id = typeof suggestion === 'number' ? suggestion : suggestion.id;
  const url = `${this.suggestionsUrl}/${id}`;

  return this.http.delete<Suggestion>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted suggestion id=${id}`)),
    catchError(this.handleError<Suggestion>('deleteSuggestion'))
  );
}

/* GET heroes whose name contains search term */
searchSuggestions(term: string): Observable<Suggestion[]> {
  if (!term.trim()) {
    // if not search term, return empty suggestions array.
    return of([]);
  }
  return this.http.get<Suggestion[]>(`${this.suggestionsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found suggestions matching "${term}"`)),
    catchError(this.handleError<Suggestion[]>('searchSuggestions', []))
  );
}

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
