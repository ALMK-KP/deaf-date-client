import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchForTrackComponent } from './components/search-for-track/search-for-track.component';
import { TrackListComponent } from './components/track-list/track-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchForTrackComponent, TrackListComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  orangeMode = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.orangeMode = this.router.url.includes('/decoded');
    });
  }
}
