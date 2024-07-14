import { Component, inject } from '@angular/core';
import { YoutubeDataService } from '../../youtube-data.service';
import { SearchForTrackAutocompleteComponent } from './search-for-track-autocomplete/search-for-track-autocomplete.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, debounceTime, filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-search-for-track',
  standalone: true,
  imports: [SearchForTrackAutocompleteComponent, ReactiveFormsModule],
  templateUrl: './search-for-track.component.html',
  styleUrl: './search-for-track.component.css',
})
export class SearchForTrackComponent {
  private readonly ytData = inject(YoutubeDataService);
  searchResults: any;
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
}
