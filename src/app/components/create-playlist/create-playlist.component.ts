import { Component, inject } from '@angular/core';
import { PLAYLIST_ID_LS_KEY } from '../../utils/constants';
import { SearchForTrackComponent } from '../search-for-track/search-for-track.component';
import { TrackListComponent } from '../track-list/track-list.component';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';
import { GlobalStore } from '../../global.store';
import { ButtonComponent } from '../button/button.component';
import { ToastrService } from 'ngx-toastr';
import { ViewModeEnum } from '../../utils/enums';

@Component({
  selector: 'app-create-playlist',
  standalone: true,
  imports: [
    SearchForTrackComponent,
    TrackListComponent,
    RouterLink,
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
  viewModeEnum = ViewModeEnum;

  constructor(
    private toastr: ToastrService,
    private clipboard: Clipboard,
  ) {
    this.store.updateMode(this.viewModeEnum.CREATION);
    const playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    if (playlistId) {
      this.store.updatePlaylistId(playlistId);
    }
    (async function (store) {
      await store.loadTracks('FULL');
    })(this.store);
  }

  copyLink() {
    this.clipboard.copy(
      `${environment.BASE_URL}/encoded/${this.store.playlistId()}`,
    );
    this.toastr.success('', 'Link copied', {
      closeButton: true,
      progressBar: true,
      timeOut: 4000,
      positionClass: 'toast-bottom-center',
    });
  }
}
