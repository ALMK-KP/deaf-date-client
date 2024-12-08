import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalStore } from '../../../global.store';
import { KnowledgeLevelEnum, ViewModeEnum } from '../../../shared/utils/enums';

@Component({
  selector: 'app-decoded-playlist',
  templateUrl: './decoded-playlist.component.html',
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
export class DecodedPlaylistComponent implements OnInit {
  readonly store = inject(GlobalStore);
  viewModeEnum = ViewModeEnum;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.store.updateMode(this.viewModeEnum.DECODED);
  }

  async ngOnInit() {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.store.updatePlaylistId(playlistId);
      await this.store.loadTracks(KnowledgeLevelEnum.FULL);
    }
  }

  goToCreationMode() {
    this.store.resetPlaylist();
    this.router.navigateByUrl('/');
  }
}
