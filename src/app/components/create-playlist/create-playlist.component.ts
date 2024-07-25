import { Component, inject } from '@angular/core';
import { TracksService } from '../../services/tracks.service';
import { PLAYLIST_ID_LS_KEY } from '../../utils/constants';
import { SearchForTrackComponent } from '../search-for-track/search-for-track.component';
import { TrackListComponent } from '../track-list/track-list.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [
    SearchForTrackComponent,
    TrackListComponent,
    RouterLink,
    CdkCopyToClipboard,
  ],
  templateUrl: './create-playlist.component.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  `,
})
export class CreatePlaylistComponent {
  private readonly tracksService = inject(TracksService);
  playlistId: string | null = null;
  tracks = [];

  constructor() {
    this.playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    if (this.playlistId) {
      this.tracksService
        .getPlaylist(this.playlistId, 'FULL')
        .subscribe((val: any) => {
          this.tracks = val.data;
        });
    }
  }

  addTrackToPlaylist($event: any) {
    this.tracksService.saveTrackToPlaylist($event).subscribe((value: any) => {
      this.tracks = value.data;
      this.playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    });
  }

  updateCustomTitle(event: any) {
    this.tracksService
      .updateCustomTitle(event.trackId, event.newCustomTitle)
      .subscribe((value: any) => {
        this.tracks = value.data;
      });
  }

  getLink() {
    return `${environment.BASE_URL}/encoded/${this.playlistId}`;
  }

  removePlaylist() {
    if (this.playlistId) {
      this.tracksService.removePlaylist(this.playlistId).subscribe(() => {
        this.tracks = [];
        localStorage.removeItem(PLAYLIST_ID_LS_KEY);
      });
    }
  }
}
