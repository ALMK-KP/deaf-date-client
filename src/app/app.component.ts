import { TuiRoot } from '@taiga-ui/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SearchForTrackComponent } from './components/search-for-track/search-for-track.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { WebsocketsService } from './services/websockets.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchForTrackComponent,
    TrackListComponent,
    TuiRoot,
    ConfirmDialogComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  orangeMode = false;
  connectedUsers: number;

  websocketsService = inject(WebsocketsService);

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.websocketsService.connectedUsersChange$.subscribe((val: any) => {
      this.connectedUsers = val - 1;
      this.cdr.markForCheck();
      console.log(val);
    });
  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.orangeMode = this.router.url.includes('/decoded');
    });
  }
}
