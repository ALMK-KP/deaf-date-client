import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  viewChild,
  viewChildren,
} from '@angular/core';
import { CustomDescriptionInputComponent } from '../custom-description-input/custom-description-input.component';
import { GlobalStore } from '../../global.store';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ConfirmDialogActionEnum, ViewModeEnum } from '../../utils/enums';
import { Track } from '../../utils/interfaces';
import { WebsocketsService } from '../../services/websockets.service';
import { NgOptimizedImage } from '@angular/common';
import {
  TuiButton,
  TuiDataListComponent,
  TuiDropdownDirective,
  TuiDropdownOpen,
  TuiDropdownPositionSided,
  TuiIcon,
  TuiIconPipe,
  TuiOptGroup,
} from '@taiga-ui/core';
import { TuiHovered } from '@taiga-ui/cdk';
import { PlayerComponent } from '../player/player.component';
import { TuiSheetDialog } from '@taiga-ui/addon-mobile';
import { PolymorpheusTemplate } from '@taiga-ui/polymorpheus';
import { DialogService } from '../../services/dialog.service';
import { TrackContextMenuDialogComponent } from '../track-context-menu-dialog/track-context-menu-dialog.component';
import { TuiFade } from '@taiga-ui/kit';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [
    CustomDescriptionInputComponent,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    CdkDragPlaceholder,
    CdkDropListGroup,
    NgOptimizedImage,
    TuiIcon,
    TuiIconPipe,
    TuiHovered,
    PlayerComponent,
    TuiButton,
    TuiSheetDialog,
    TuiDataListComponent,
    TuiDropdownDirective,
    TuiDropdownPositionSided,
    TuiDropdownOpen,
    TuiOptGroup,
    PolymorpheusTemplate,
    TrackContextMenuDialogComponent,
    TuiFade,
  ],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  @Output() customTitleUpdated = new EventEmitter();
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
      // const trackIdElement = this.audioRefs()
      //   .map((sd) => sd.nativeElement)
      //   .find((ref) => ref.id === val.trackId);
      // if (!trackIdElement) return;
      //
      // if (val.isPlaying) {
      //   trackIdElement.play();
      //   return;
      // }
      //
      // trackIdElement.pause();
    });

    this.dialogHelper.confirmDialogAction$.subscribe((actionType) => {
      if (actionType === ConfirmDialogActionEnum.DELETE_PLAYLIST) {
        this.playlistRemoved.emit();
      }
    });
  }

  updateCustomTitle(text: string) {
    this.customTitleUpdated.emit(text);
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

  handleOnPause(el: HTMLAudioElement) {
    this.isPlaying = false;
    this.websocketsService.emitTogglePlay({
      trackId: el.id,
      isPlaying: false,
    });
  }

  handleOnPlay(trackId: number) {
    this.isPlaying = true;
    this.websocketsService.emitTogglePlay({
      trackId: trackId,
      isPlaying: true,
    });
  }

  onHovered(hovered: boolean, track: Track) {
    this.hoveredId = hovered ? track.id : null;
  }

  selectTrack(track: any | HTMLDivElement) {
    if (track.id === this.selectedToPlayTrackId) {
      this.handleOnPlay(track.id);
      console.log(this.playerComponent())
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

  openTrackContextMenuDialog(track: Track) {
    this.dialogHelper.openTrackContextMenuDialog(track);
  }
}
