import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionSearchComponent } from './suggestion-search.component';

describe('SuggestionSearchComponent', () => {
  let component: SuggestionSearchComponent;
  let fixture: ComponentFixture<SuggestionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
