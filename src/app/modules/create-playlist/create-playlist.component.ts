import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PLAYLIST_ID_LS_KEY } from '../../shared/utils/constants';
import { environment } from '../../../environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';
import { GlobalStore } from '../../global.store';
import {
  ConfirmDialogActionEnum,
  KnowledgeLevelEnum,
  ViewModeEnum,
} from '../../shared/utils/enums';
import { DialogService } from '../../shared/services/dialog.service';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-create-playlist',
  templateUrl: './create-playlist.component.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePlaylistComponent {
  readonly store = inject(GlobalStore);
  viewModeEnum = ViewModeEnum;

  constructor(
    private snackbar: SnackbarService,
    private clipboard: Clipboard,
    private dialogHelper: DialogService,
  ) {
    this.store.updateMode(this.viewModeEnum.CREATION);
    const playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    if (playlistId) {
      this.store.updatePlaylistId(playlistId);
    }
    (async function (store) {
      await store.loadTracks(KnowledgeLevelEnum.FULL);
    })(this.store);

    this.dialogHelper.confirmDialogAction$.subscribe((actionType) => {
      if (actionType === ConfirmDialogActionEnum.DELETE_PLAYLIST) {
        this.store.removePlaylist();
      }
    });
  }

  openConfirmDialog() {
    this.dialogHelper.openConfirmDialog(
      'Delete playlist?',
      'Delete',
      ConfirmDialogActionEnum.DELETE_PLAYLIST,
    );
  }

  copyLink() {
    this.clipboard.copy(
      `${environment.BASE_URL}/encoded/${this.store.playlistId()}`,
    );
    this.snackbar.info('Link copied');
  }
}
