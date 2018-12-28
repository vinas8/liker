import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../Suggestion';
import { SuggestionService } from '../suggestion.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { VoteService } from '../vote.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  suggestions: Suggestion[];

  constructor(private suggestionService: SuggestionService, public afAuth: AngularFireAuth,
    private voteService: VoteService) { }

  ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions(): void {
    this.suggestionService.getSuggestions()
      .subscribe(suggestions => this.suggestions = suggestions);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.suggestionService.addSuggestion({ name } as Suggestion)
      // .subscribe(suggestion => {
      //   this.suggestions.push(suggestion);
      // });
  }

  delete(suggestion: Suggestion): void {
    this.suggestions = this.suggestions.filter(h => h !== suggestion);
    this.suggestionService.deleteSuggestion(suggestion).subscribe();
  }

  like(suggestion): void {
    this.suggestionService.vote(suggestion)
  }

}
