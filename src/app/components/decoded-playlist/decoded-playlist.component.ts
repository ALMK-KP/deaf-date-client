import { Component, inject, OnInit } from '@angular/core';
import { TrackListComponent } from '../track-list/track-list.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GlobalStore } from '../../global.store';

@Component({
  selector: 'app-decoded-playlist',
  standalone: true,
  imports: [TrackListComponent, RouterLink],
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

  constructor(private route: ActivatedRoute) {
    this.store.updateMode('DECODED');
  }

  async ngOnInit() {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.store.updatePlaylistId(playlistId);
      await this.store.loadTracks('FULL');
    }
  }
}
