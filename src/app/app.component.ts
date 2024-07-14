import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchForTrackComponent } from './components/search-for-track/search-for-track.component';
import { TracksService } from './services/tracks.service';
import {TrackListComponent} from "./components/track-list/track-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchForTrackComponent, TrackListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'deaf-date-yt';
  private readonly tracksService = inject(TracksService);
  tracks = [];

  addTrackToPlaylist($event: any) {
    console.log('APP COMPONENT');
    this.tracksService.saveTrackToPlaylist($event).subscribe((value: any) => {
      console.log('playlist', value);
      this.tracks = value.data;
    });
  }
}
