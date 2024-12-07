import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { PlayerState } from '../player.state';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  audioRef = viewChild<ElementRef>('audio');

  readonly playerState = inject(PlayerState);

  constructor() {
    effect(() => {
      if (!this.playerState.selectedTrack()) return;

      this.audioRef()?.nativeElement.load();
    });

    effect(() => {
      if (!this.playerState.selectedTrack()) return;

      if (this.playerState.isPlaying()) {
        this.audioRef()?.nativeElement.play();
        return;
      }

      this.audioRef()?.nativeElement.pause();
    });
  }
}
