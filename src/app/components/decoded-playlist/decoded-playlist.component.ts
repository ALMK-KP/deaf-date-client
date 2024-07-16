import { Component, inject, OnInit } from '@angular/core';
import { TrackListComponent } from '../track-list/track-list.component';
import { TracksService } from '../../services/tracks.service';
import {ActivatedRoute, RouterLink} from '@angular/router';

@Component({
  selector: 'app-decoded-playlist',
  standalone: true,
  imports: [TrackListComponent, RouterLink],
  templateUrl: './decoded-playlist.component.html',
})
export class DecodedPlaylistComponent implements OnInit {
  private readonly tracksService = inject(TracksService);
  tracks = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const playlistId = this.route.snapshot.paramMap.get('id');
    if (playlistId) {
      this.tracksService
        .getPlaylist(playlistId, 'FULL')
        .subscribe((val: any) => {
          this.tracks = val.data;
        });
    }
  }
}
