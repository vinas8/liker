import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vote } from './Vote';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private db: AngularFirestore, private messageService: MessageService) { }

  getVote(suggestionId, userId): any {

    let value = this.db.collection('votes', ref => {
      return ref.where('userId', '==', userId).where('suggestionId', '==', suggestionId)
    });
    // this.messageService.add('SuggestionService: fetched suggestions')
    return value.valueChanges();
  }
  

  getUserVotes(userId) {
    let value = this.db.collection('votes', ref => {
      return ref.where('userId', '==', userId)
    });

    return value.valueChanges();
  }

  vote(suggestionId, userId): void {
    let votes = this.db.collection('votes')

    votes.add({
      userId: userId,
      suggestionId: suggestionId
    }).catch(error => this.handleError(error))
  }

    // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }

}
