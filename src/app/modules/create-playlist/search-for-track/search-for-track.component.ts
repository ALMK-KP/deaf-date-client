import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { SearchedYouTubeTrack } from '../../../shared/utils/interfaces';
import { YoutubeSearchService } from '../../../shared/services/youtube-search.service';

@Component({
  selector: 'app-search-for-track',
  templateUrl: './search-for-track.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchForTrackComponent {
  @Output() addTrack = new EventEmitter();
  searchResults: Array<SearchedYouTubeTrack> = [];
  searchQuery = new FormControl<string>('');
  loading: boolean;

  constructor(
    private cdr: ChangeDetectorRef,
    private ytData: YoutubeSearchService,
  ) {
    this.searchQuery.valueChanges
      .pipe(
        debounceTime(400),
        filter((val): val is string => val !== null),
        filter((val: string) => val.length > 3),
        tap(() => {
          this.loading = true;
          this.cdr.markForCheck();
        }),
        switchMap((val: string) => this.ytData.searchYouTubeData(val)),
      )
      .subscribe((value) => {
        this.loading = false;
        this.searchResults = value;
        this.cdr.markForCheck();
      });
  }

  emitAddTrack(track: SearchedYouTubeTrack) {
    this.searchQuery.setValue('');
    this.addTrack.emit(track);
  }
}
