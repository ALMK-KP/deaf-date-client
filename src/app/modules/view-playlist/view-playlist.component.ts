import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PLAYLIST_ID_LS_KEY } from '../../shared/utils/constants';
import { GlobalStore } from '../../global.store';
import {
  ConfirmDialogActionEnum,
  KnowledgeLevelEnum,
  ViewModeEnum,
} from '../../shared/utils/enums';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
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
export class ViewPlaylistComponent implements OnInit {
  readonly store = inject(GlobalStore);
  isCreatorOfCurrentPlaylist = false;
  knowledgeLevel: KnowledgeLevelEnum;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialogHelper: DialogService,
  ) {
    this.route.data.subscribe(({ mode }) => {
      this.knowledgeLevel =
        mode === ViewModeEnum.ENCODED
          ? KnowledgeLevelEnum.ENCODED
          : KnowledgeLevelEnum.FULL;
      this.store.updateMode(mode);
    });

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
      await this.store.loadTracks(this.knowledgeLevel);

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

  goToCreationMode() {
    this.store.resetPlaylist();
    this.router.navigateByUrl('/');
  }

  protected readonly ViewModeEnum = ViewModeEnum;
}
