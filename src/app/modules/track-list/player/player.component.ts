import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit, OnChanges {
  @Input() trackId: number;
  @Input() trackSrc: string;
  @Output() play = new EventEmitter();
  @Output() pause = new EventEmitter();

  audioRef = viewChild<ElementRef>('audio');

  ngOnChanges() {
    console.log(this.trackSrc);
    this.audioRef()?.nativeElement.load();
  }

  ngOnInit() {
    console.log(this.trackSrc);
  }

  handleOnPause(audio: HTMLAudioElement) {
    this.pause.emit(audio);
  }

  handleOnPlay(audio: HTMLAudioElement) {
    this.play.emit(audio.id);
  }
}
