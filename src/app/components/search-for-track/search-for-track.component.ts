import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TuiAmountPipe, TuiInputCard } from '@taiga-ui/addon-commerce';
import { TuiLet } from '@taiga-ui/cdk';
import { TuiDataList, TuiInitialsPipe, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar, TuiDataListWrapper } from '@taiga-ui/kit';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { debounceTime, filter, switchMap, tap } from 'rxjs';
import { SearchedYouTubeTrack } from '../../utils/interfaces';
import { YoutubeSearchService } from '../../services/youtube-search.service';

@Component({
  standalone: true,
  selector: 'app-search-for-track',
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TuiAmountPipe,
    TuiAvatar,
    TuiDataList,
    TuiDataListWrapper,
    TuiInitialsPipe,
    TuiInputCard,
    TuiInputModule,
    TuiLet,
    TuiTextfield,
    TuiTextfieldControllerModule,
  ],
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
