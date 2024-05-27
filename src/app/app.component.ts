import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { YoutubeDataService } from './youtube-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'deaf-date-yt';
  private readonly ytData = inject(YoutubeDataService);

  constructor() {
    this.ytData
      .searchYouTubeData('imagine dragons')
      .subscribe((value) => console.log(value));
  }
}
