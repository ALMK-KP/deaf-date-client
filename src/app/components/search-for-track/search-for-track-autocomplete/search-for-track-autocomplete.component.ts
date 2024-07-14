import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-for-track-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './search-for-track-autocomplete.component.html',
  styleUrl: './search-for-track-autocomplete.component.css',
})
export class SearchForTrackAutocompleteComponent {
  @Input() searchResults: any[] = [];
  @Input() loading = false;
  @Output() addTrack = new EventEmitter();

  addTrackToPlaylist(track: any) {
    console.log('AUTOCOMPLETE');
    this.addTrack.emit({
      ytId: track.ytId,
      ytLink: track.ytLink,
      thumbnail: track.thumbnails.default.url,
      title: track.title,
    });
  }
}
