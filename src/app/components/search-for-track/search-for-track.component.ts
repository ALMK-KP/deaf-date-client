import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SearchForTrackAutocompleteComponent } from './search-for-track-autocomplete/search-for-track-autocomplete.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { YoutubeSearchService } from '../../services/youtube-search.service';
import { SearchedYouTubeTrack } from '../../utils/interfaces';

@Component({
  selector: 'app-search-for-track',
  standalone: true,
  imports: [SearchForTrackAutocompleteComponent, ReactiveFormsModule],
  templateUrl: './search-for-track.component.html',
})
export class SearchForTrackComponent {
  @Output() addTrack = new EventEmitter();
  private readonly ytData = inject(YoutubeSearchService);
  searchResults: Array<SearchedYouTubeTrack>;
  loading = false;
  searchQuery = new FormControl<string>('');
  autocompleteOpened = false;

  constructor() {
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(800),
        filter((val): val is string => val !== null),
        filter((val: string) => val.length > 3),
        tap(() => {
          this.loading = true;
          this.autocompleteOpened = true;
        }),
        switchMap((val: string) => this.ytData.searchYouTubeData(val)),
      )
      .subscribe((value) => {
        console.log(value);
        this.loading = false;
        this.searchResults = value;
      });
  }

  toggleAutocomplete(value: boolean) {
    this.autocompleteOpened = value;
  }

  clearSearchQuery() {
    this.searchQuery.setValue('');
    this.searchResults = [];
  }

  emitAddTrack(track: SearchedYouTubeTrack) {
    this.autocompleteOpened = false;
    this.addTrack.emit(track);
  }
}
