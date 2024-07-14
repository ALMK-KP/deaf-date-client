import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SearchForTrackComponent} from "./components/search-for-track/search-for-track.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchForTrackComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'deaf-date-yt';

}
