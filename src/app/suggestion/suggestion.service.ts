import { Injectable } from '@angular/core';
import { Suggestion } from './Suggestion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';


export const suggestionsUrl = 'api/suggestions'; // URL to web api

@Injectable({
  providedIn: 'root'
})
export class SuggestionService {
  constructor(
    private http: HttpClient,
    private db: AngularFirestore) { }

  vote(suggestion) {
    if (!suggestion.liked) {
      this.db.collection('suggestions').doc(suggestion.id.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(window.localStorage.getItem('uid'))
      });
    } else {
      this.db.collection('suggestions').doc(suggestion.id.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(window.localStorage.getItem('uid'))
      });
    }
  }

  getSuggestions(): any {
    const suggestions = this.db.collection('suggestions');

    const snapshot = suggestions.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Suggestion;
        const id = a.payload.doc;
        let liked = false;
        const likes = data.likes;

        if (typeof likes !== 'undefined' && likes.includes(window.localStorage.getItem('uid'))) {
          liked = true;
        }
        
        return { id, ...data, liked };
      });
    }));
    return snapshot;
  }

  addSuggestion(suggestion: Suggestion): void {
    this.db.collection('suggestions').add(suggestion);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
