import { TuiIcon, TuiRoot } from '@taiga-ui/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketsService } from './shared/services/websockets.service';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { TargetDirective } from './shared/directives/target.directive';
import { TrackListModule } from './modules/track-list/track-list.module';
import { CreatePlaylistModule } from './modules/create-playlist/create-playlist.module';
import { ViewPlaylistModule } from './modules/view-playlist/view-playlist.module';
import { TuiElasticSticky } from '@taiga-ui/addon-mobile';
import { tuiClamp } from '@taiga-ui/cdk';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    // NG
    AsyncPipe,
    RouterOutlet,
    // Custom
    TrackListModule,
    ViewPlaylistModule,
    CreatePlaylistModule,
    ConfirmDialogComponent,
    TargetDirective,
    // Libs
    TuiRoot,
    TuiIcon,
    TuiElasticSticky,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  connectedUsers: number;
  scale = 1;

  websocketsService = inject(WebsocketsService);

  constructor(private cdr: ChangeDetectorRef) {
    this.websocketsService.connectedUsersChange$.subscribe((val: any) => {
      this.connectedUsers = val - 1;
      this.cdr.markForCheck();
      console.log(val);
    });
  }

  onElastic(scale: number) {
    this.scale = tuiClamp(scale, 0.7, 1);
    this.cdr.detectChanges();
  }
}
