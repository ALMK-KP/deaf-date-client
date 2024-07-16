import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TracksService } from '../../services/tracks.service';
import { TrackListComponent } from '../track-list/track-list.component';

@Component({
  selector: 'app-encoded-playlist',
  standalone: true,
  imports: [TrackListComponent],
  templateUrl: './encoded-playlist.component.html',
})
export class EncodedPlaylistComponent implements OnInit {
  private readonly tracksService = inject(TracksService);
  tracks = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.tracksService
        .getPlaylist(playlistId, 'ENCODED')
        .subscribe((val: any) => {
          this.tracks = val.data;
        });
    }
  }
}
