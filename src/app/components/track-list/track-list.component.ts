import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
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
  expanded = true;
  dragging = false;
  expandedTrackId: number | null = null;
  viewModeEnum = ViewModeEnum;
  selectedToPlayTrackId: number;
  selectedTrackSrc: string;
  hoveredId: number | null;
  open: boolean;
  audioRefs = viewChildren<ElementRef>('audio');

  websocketsService = inject(WebsocketsService);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly dialogHelper: DialogService,
  ) {
    this.websocketsService.toggledPlayEvent$.subscribe((val: any) => {
      const trackIdElement = this.audioRefs()
        .map((sd) => sd.nativeElement)
        .find((ref) => ref.id === val.trackId);
      if (!trackIdElement) return;

      if (val.isPlayling) {
        trackIdElement.play();
        return;
      }

      trackIdElement.pause();
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
    this.websocketsService.emitTogglePlay({
      trackId: el.id,
      isPlayling: false,
    });
  }

  handleOnPlay(el: HTMLAudioElement) {
    this.websocketsService.emitTogglePlay({ trackId: el.id, isPlayling: true });
  }

  onHovered(hovered: boolean, track: Track) {
    this.hoveredId = hovered ? track.id : null;
  }

  selectTrack(track: any | HTMLDivElement) {
    this.selectedToPlayTrackId = track.id;
    this.selectedTrackSrc = track.audio;
    console.log(this.selectedToPlayTrackId);
    console.log(this.selectedTrackSrc);
    this.cdr.markForCheck();
    this.cdr.detectChanges();
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
