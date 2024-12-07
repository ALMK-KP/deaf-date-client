import { TuiRoot } from '@taiga-ui/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WebsocketsService } from './shared/services/websockets.service';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { TargetDirective } from './shared/directives/target.directive';
import { TrackListModule } from './modules/track-list/track-list.module';
import { CreatePlaylistModule } from './modules/create-playlist/create-playlist.module';
import { ViewPlaylistModule } from './modules/view-playlist/view-playlist.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // NG
    RouterOutlet,
    // Custom
    TrackListModule,
    ViewPlaylistModule,
    CreatePlaylistModule,
    ConfirmDialogComponent,
    TargetDirective,
    // Libs
    TuiRoot,
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
