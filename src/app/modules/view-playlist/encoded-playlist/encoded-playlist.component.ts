import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PLAYLIST_ID_LS_KEY } from '../../../shared/utils/constants';
import { GlobalStore } from '../../../global.store';
import {
  ConfirmDialogActionEnum,
  KnowledgeLevelEnum,
  ViewModeEnum,
} from '../../../shared/utils/enums';
import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-encoded-playlist',
  templateUrl: './encoded-playlist.component.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncodedPlaylistComponent implements OnInit {
  readonly store = inject(GlobalStore);
  isCreatorOfCurrentPlaylist = false;
  viewModeEnum = ViewModeEnum;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogHelper: DialogService,
  ) {
    this.store.updateMode(this.viewModeEnum.ENCODED);

    this.dialogHelper.confirmDialogAction$.subscribe((actionType) => {
      if (actionType === ConfirmDialogActionEnum.REVEAL_PLAYLIST) {
        this.router.navigateByUrl(`decoded/${this.store.playlistId()}`);
      }
    });
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

  openConfirmDialog() {
    this.dialogHelper.openConfirmDialog(
      'Reveal playlist?',
      'Reveal',
      ConfirmDialogActionEnum.REVEAL_PLAYLIST,
    );
  }
}
