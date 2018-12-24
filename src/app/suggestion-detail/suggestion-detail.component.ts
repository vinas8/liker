import { Component, OnInit, Input } from '@angular/core';
import { Suggestion } from '../Suggestion'
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SuggestionService } from '../suggestion.service';

@Component({
  selector: 'app-suggestion-detail',
  templateUrl: './suggestion-detail.component.html',
  styleUrls: ['./suggestion-detail.component.css']
})
export class SuggestionDetailComponent implements OnInit {
  suggestion: Suggestion;

  constructor(  private route: ActivatedRoute,
    private suggestionService: SuggestionService,
    private location: Location) { }

  ngOnInit() {
    this.getSuggestion();
  }

  getSuggestion(): void {
    //Route parameters are always strings. The JavaScript (+) operator converts the string to a number
    const id = +this.route.snapshot.paramMap.get('id');
    this.suggestionService.getSuggestion(id).subscribe(suggestion => this.suggestion = suggestion)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.suggestionService.updateSuggestion(this.suggestion)
      .subscribe(() => this.goBack());
  }
}
