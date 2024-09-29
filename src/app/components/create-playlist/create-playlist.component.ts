import { Component, inject } from '@angular/core';
import { PLAYLIST_ID_LS_KEY } from '../../utils/constants';
import { SearchForTrackComponent } from '../search-for-track/search-for-track.component';
import { TrackListComponent } from '../track-list/track-list.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { GlobalStore } from '../../global.store';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [
    SearchForTrackComponent,
    TrackListComponent,
    RouterLink,
    CdkCopyToClipboard,
    ButtonComponent,
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
  readonly store = inject(GlobalStore);

  constructor() {
    this.store.updateMode('CREATION');
    const playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    if (playlistId) {
      this.store.updatePlaylistId(playlistId);
    }
    (async function (store) {
      await store.loadTracks('FULL');
    })(this.store);
  }

  getLink() {
    return `${environment.BASE_URL}/encoded/${this.store.playlistId()}`;
  }
}
