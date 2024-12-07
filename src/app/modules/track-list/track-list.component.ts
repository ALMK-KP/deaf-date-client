import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output,
  viewChild,
} from '@angular/core';
import { GlobalStore } from '../../global.store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfirmDialogActionEnum, ViewModeEnum } from '../../shared/utils/enums';
import { Track } from '../../shared/utils/interfaces';
import { WebsocketsService } from '../../shared/services/websockets.service';
import { PlayerComponent } from './player/player.component';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  @Output() playlistRemoved = new EventEmitter();
  @Output() tracksReordered = new EventEmitter();
  readonly store = inject(GlobalStore);
  isPlaying = false;
  dragging = false;
  viewModeEnum = ViewModeEnum;
  selectedToPlayTrackId: number;
  selectedTrackSrc: string;
  hoveredId: number | null;
  open: boolean;
  playerComponent = viewChild(PlayerComponent);

  websocketsService = inject(WebsocketsService);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly dialogHelper: DialogService,
  ) {
    this.websocketsService.toggledPlayEvent$.subscribe((val: any) => {
      console.log(val);
    });

    this.dialogHelper.confirmDialogAction$.subscribe((actionType) => {
      if (actionType === ConfirmDialogActionEnum.DELETE_PLAYLIST) {
        this.playlistRemoved.emit();
      }
    });
  }

  drop(event: CdkDragDrop<Array<Track>>) {
    moveItemInArray(
      this.store.tracks(),
      event.previousIndex,
      event.currentIndex,
    );
    this.tracksReordered.emit({
      playlistId: this.store.playlistId(),
      reorderedTracks: this.store.tracks(),
    });
    this.dragging = false;
  }

  toggleDragging(value: boolean) {
    this.dragging = value;
  }

  isMode(mode: ViewModeEnum) {
    return this.store.mode() === mode;
  }

  handleOnPause(trackId: number) {
    this.isPlaying = false;
    this.websocketsService.emitTogglePlay({
      trackId: trackId,
      isPlaying: false,
    });
    this.cdr.markForCheck();
  }

  handleOnPlay(trackId: number) {
    this.isPlaying = true;
    this.websocketsService.emitTogglePlay({
      trackId: trackId,
      isPlaying: true,
    });
    this.cdr.markForCheck();
  }

  onHovered(hovered: boolean, track: Track) {
    this.hoveredId = hovered ? track.id : null;
  }

  selectTrack(track: Track) {
    if (track.id === this.selectedToPlayTrackId) {
      this.handleOnPlay(track.id);
      this.playerComponent()?.audioRef()?.nativeElement.play();
      return;
    }
    this.selectedToPlayTrackId = track.id;
    this.selectedTrackSrc = track.audio;
    this.cdr.markForCheck();
  }

  openConfirmDialog() {
    this.dialogHelper.openConfirmDialog(
      'Delete playlist?',
      'Delete',
      ConfirmDialogActionEnum.DELETE_PLAYLIST,
    );
  }
}
