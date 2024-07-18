import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TracksService } from '../../services/tracks.service';
import { TrackListComponent } from '../track-list/track-list.component';
import { PLAYLIST_ID_LS_KEY } from '../../utils/constants';

@Component({
  selector: 'app-encoded-playlist',
  standalone: true,
  imports: [TrackListComponent, RouterLink],
  templateUrl: './encoded-playlist.component.html',
})
export class EncodedPlaylistComponent implements OnInit {
  private readonly tracksService = inject(TracksService);
  tracks = [];
  playlistId: string | null = null;
  isCreatorOfCurrentPlaylist = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.playlistId = this.route.snapshot.paramMap.get('id');
    if (this.playlistId) {
      this.tracksService
        .getPlaylist(this.playlistId, 'ENCODED')
        .subscribe((val: any) => {
          this.tracks = val.data;
        });
      this.isCreatorOfCurrentPlaylist =
        localStorage.getItem(PLAYLIST_ID_LS_KEY) === this.playlistId;
    }
  }
}
