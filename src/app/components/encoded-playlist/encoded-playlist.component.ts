import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrackListComponent } from '../track-list/track-list.component';
import { PLAYLIST_ID_LS_KEY } from '../../utils/constants';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalStore } from '../../global.store';

@Component({
  selector: 'app-encoded-playlist',
  standalone: true,
  imports: [TrackListComponent, RouterLink, DialogComponent],
  templateUrl: './encoded-playlist.component.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  `,
})
export class EncodedPlaylistComponent implements OnInit {
  readonly store = inject(GlobalStore);
  isCreatorOfCurrentPlaylist = false;
  isConfirmationDialogOpened = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.store.updateMode('ENCODED');
  }

  async ngOnInit() {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.store.updatePlaylistId(playlistId);
      await this.store.loadTracks('ENCODED');

      this.isCreatorOfCurrentPlaylist =
        localStorage.getItem(PLAYLIST_ID_LS_KEY) === playlistId;
    }
  }

  openConfirmationDialog() {
    this.isConfirmationDialogOpened = true;
  }

  handleDialogClick(confirmed: boolean) {
    this.isConfirmationDialogOpened = false;
    if (confirmed) {
      this.router.navigateByUrl(`decoded/${this.store.playlistId()}`);
    }
  }
}
