import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchForTrackComponent } from './components/search-for-track/search-for-track.component';
import { TrackListComponent } from './components/track-list/track-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchForTrackComponent, TrackListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
