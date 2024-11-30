import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { SearchedYouTubeTrack } from '../../../utils/interfaces';

@Component({
  selector: 'app-search-for-track-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './search-for-track-autocomplete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchForTrackAutocompleteComponent {
  @Input() searchResults: Array<SearchedYouTubeTrack> = [];
  @Input() loading = false;
  @Output() addTrack: EventEmitter<SearchedYouTubeTrack> = new EventEmitter();

  addTrackToPlaylist(track: SearchedYouTubeTrack) {
    this.addTrack.emit({
      ytId: track.ytId,
      ytLink: track.ytLink,
      thumbnail: track.thumbnails?.default?.url,
      title: track.title,
    });
  }
}
