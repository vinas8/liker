import { Component, OnInit } from '@angular/core';
import { Suggestion } from '../Suggestion';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  suggestions: Suggestion[];

  constructor(private suggestionService: SuggestionService) { }

  ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions() {
    this.suggestionService.getSuggestions()
      .subscribe(suggestion => this.suggestions = suggestion.slice(0, 5))
  }

}
