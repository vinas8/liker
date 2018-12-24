import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../Suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.css']
})
export class SuggestionComponent implements OnInit {
  suggestions: Suggestion[];
  // selectedSuggestion: Suggestion;

  constructor(private suggestionService: SuggestionService) { }

  ngOnInit() {
    this.getSuggestions();
  }

  // onSelect(suggestion: Suggestion): void {
  //   this.selectedSuggestion = suggestion;
  // }

  getSuggestions(): void {
    this.suggestionService.getSuggestions()
      .subscribe(suggestions => this.suggestions = suggestions);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.suggestionService.addSuggestion({ name } as Suggestion)
      .subscribe(suggestion => {
        this.suggestions.push(suggestion);
      });
  }

  delete(suggestion: Suggestion): void {
    this.suggestions = this.suggestions.filter(h => h !== suggestion);
    this.suggestionService.deleteSuggestion(suggestion).subscribe();
  }
}
