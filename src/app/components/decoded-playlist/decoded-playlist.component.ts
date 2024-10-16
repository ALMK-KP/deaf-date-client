import { Component, inject, OnInit } from '@angular/core';
import { TrackListComponent } from '../track-list/track-list.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GlobalStore } from '../../global.store';
import { ButtonComponent } from '../button/button.component';
import {KnowledgeLevelEnum, ViewModeEnum} from '../../utils/enums';

@Component({
  selector: 'app-decoded-playlist',
  standalone: true,
  imports: [TrackListComponent, RouterLink, ButtonComponent],
  templateUrl: './decoded-playlist.component.html',
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }
  `,
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
