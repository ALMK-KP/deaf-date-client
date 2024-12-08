import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
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
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  currentTime = 0;

  audioRef = viewChild<ElementRef>('audio');

  readonly playerState = inject(PlayerState);

  protected toggleState(): void {
    this.playerState.setIsPlaying(!this.playerState.isPlaying());
  }
}
