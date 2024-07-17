import { Component, inject } from '@angular/core';
import { TracksService } from '../../services/tracks.service';
import { PLAYLIST_ID_LS_KEY } from '../../utils/constants';
import { SearchForTrackComponent } from '../search-for-track/search-for-track.component';
import { TrackListComponent } from '../track-list/track-list.component';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [SearchForTrackComponent, TrackListComponent],
  templateUrl: './create-playlist.component.html',
})
export class CreatePlaylistComponent {
  private readonly tracksService = inject(TracksService);
  tracks = [];

  constructor() {
    const playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    if (playlistId) {
      this.tracksService
        .getPlaylist(playlistId, 'FULL')
        .subscribe((val: any) => {
          this.tracks = val.data;
        });
    }
  }

  addTrackToPlaylist($event: any) {
    this.tracksService.saveTrackToPlaylist($event).subscribe((value: any) => {
      this.tracks = value.data;
    });
  }

  updateCustomTitle(event: any) {
    this.tracksService
      .updateCustomTitle(event.trackId, event.newCustomTitle)
      .subscribe((value: any) => {
        this.tracks = value.data;
      });
  }
}
