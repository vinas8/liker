import { Injectable } from '@angular/core';
import { Suggestion } from './Suggestion'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Vote } from './Vote';
import * as firebase from 'firebase';


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


  // getItemVotes(itemId): FirebaseObjectObservable<any> {
  //   // Gets total votes
  //   return this.db.object(`upvotes/${itemId}`)
  // }

  // updateUserVote(itemId, userId, vote): void {
  //   // Creates or updates user's vote
  //   let data = {}
  //   data[userId] = vote
  //   this.db.object(`upvotes/${itemId}`).update(data)
  // }

  vote(suggestion) {
    if (!suggestion.liked) {
      this.db.collection('suggestions').doc(suggestion.id.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(window.localStorage.getItem('uid'))
      })
    } else {
      this.db.collection('suggestions').doc(suggestion.id.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(window.localStorage.getItem('uid'))
      })
    }
  }

  getSuggestions(): any {
    let suggestions = this.db.collection('suggestions')

    let snapshot = suggestions.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Suggestion;
        const id = a.payload.doc;
        let liked = false;
        const likes = data.likes

        if (typeof likes !== "undefined" && likes.includes(window.localStorage.getItem('uid'))) {
          liked = true;
        }
       
        return { id, ...data, liked };
      })
    }));
    // this.messageService.add('SuggestionService: fetched suggestions')
    //Applying the optional type specifier, <Hero[]> , gives you a typed result object.
    return snapshot;
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

  updateSuggestion(suggestion: Suggestion) {
    let newSuggestion = this.db.doc('suggestions/' + suggestion.id)
    newSuggestion.update(suggestion);
  }

  /** POST: add a new hero to the server */
  // : Observable<Suggestion>
  addSuggestion(suggestion: Suggestion): void {
    this.db.collection('suggestions').add(suggestion)

    // const httpOptions = {
    //   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    // };
    // return this.http.post<Suggestion>(this.suggestionsUrl, suggestion, httpOptions).pipe(
    //   tap((suggestion: Suggestion) => this.log(`added suggestion w/ id=${suggestion.id}`)),
    //   catchError(this.handleError<Suggestion>('addSuggestion'))
    // );
  }

  /** DELETE: delete the hero from the server */
  deleteSuggestion(suggestion: Suggestion | number): Observable<Suggestion> {
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
