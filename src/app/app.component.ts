import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SearchService} from './_services/search.service';
import {ISearchResult} from './_models/index.dto';
import {SearchResult} from './_models/index.domain';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Eniro search client with Angular';
  @ViewChild('eniroSearchInput', {static: true}) eniroSearchInput: ElementRef;
  result: SearchResult;
  private isSearching: boolean;

  constructor(private searchService: SearchService) {
    this.isSearching = false;
  }

  ngOnInit(): void {

    fromEvent(this.eniroSearchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      }),

      // Time in milliseconds between key events
      debounceTime(1000),

      // if character length greater then 2
      filter(res => res.length > 2),

      // If previous query is diffent from current
      distinctUntilChanged()

      // subscription for response
    ).subscribe((text: string) => {
      this.isSearching = true;
      this.searchService.search(text).subscribe(result => {
        this.result = result;
        this.isSearching = false;
      });
    });
  }
}
