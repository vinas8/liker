import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { Suggestion } from '../Suggestion';
import { SuggestionService } from '../suggestion.service';
 
@Component({
  selector: 'app-suggestion-search',
  templateUrl: './suggestion-search.component.html',
  styleUrls: ['./suggestion-search.component.css']
})
export class SuggestionSearchComponent implements OnInit {

  suggestion$: Observable<Suggestion[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private suggestionService: SuggestionService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.suggestion$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.suggestionService.searchSuggestions(term)),
    );
  }

}
