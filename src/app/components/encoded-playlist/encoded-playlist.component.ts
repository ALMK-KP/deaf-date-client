import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TrackListComponent } from '../track-list/track-list.component';
import { PLAYLIST_ID_LS_KEY } from '../../utils/constants';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalStore } from '../../global.store';
import { ButtonComponent } from '../button/button.component';
import { KnowledgeLevelEnum, ViewModeEnum } from '../../utils/enums';

@Component({
  selector: 'app-encoded-playlist',
  standalone: true,
  imports: [TrackListComponent, RouterLink, DialogComponent, ButtonComponent],
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
  viewModeEnum = ViewModeEnum;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.store.updateMode(this.viewModeEnum.ENCODED);
  }

  async ngOnInit() {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.store.updatePlaylistId(playlistId);
      await this.store.loadTracks(KnowledgeLevelEnum.ENCODED);

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
