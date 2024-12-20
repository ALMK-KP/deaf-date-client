import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { PlayerState } from '../player.state';
import { TuiInputSliderComponent } from '@taiga-ui/legacy';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  audioRef = viewChild<ElementRef>('audio');
  currentTime = 0;

  readonly playerState = inject(PlayerState);

  constructor() {
    effect(() => {
      this.currentTime = this.playerState.currentTime();
    });
  }

  toggleState(): void {
    this.playerState.setIsPlaying(!this.playerState.isPlaying());
    this.playerState.setCurrentTime(this.currentTime);
  }

  setCurrentTime($event: any) {
    this.currentTime = $event.target.currentTime;
  }

  manuallyChangeCurrentTime($event: Event) {
    const currentTime = ($event.target as unknown as TuiInputSliderComponent)
      ?.value;
    this.playerState.setCurrentTime(currentTime);
  }
}
