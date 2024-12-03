import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
  viewChild,
  viewChildren,
} from '@angular/core';
import { CustomDescriptionInputComponent } from '../custom-description-input/custom-description-input.component';
import { DialogComponent } from '../dialog/dialog.component';
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
import { ViewModeEnum } from '../../utils/enums';
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
import {
  TuiSheetDialog,
  TuiSheetDialogOptions,
  TuiSheetDialogService,
} from '@taiga-ui/addon-mobile';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [
    CustomDescriptionInputComponent,
    DialogComponent,
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
  ],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  @Output() customTitleUpdated = new EventEmitter();
  @Output() playlistRemoved = new EventEmitter();
  @Output() trackRemoved = new EventEmitter();
  @Output() tracksReordered = new EventEmitter();
  readonly store = inject(GlobalStore);
  expanded = true;
  dragging = false;
  expandedTrackId: number | null = null;
  isConfirmationDialogOpened = false;
  viewModeEnum = ViewModeEnum;
  selectedTrackId: number | null = null;
  selectedToPlayTrackId: number;
  selectedTrackSrc: string;
  hoveredId: number | null;
  open: boolean;
  openContext: boolean;
  audioRefs = viewChildren<ElementRef>('audio');
  sheetRef = viewChild('sheetTest', { read: TemplateRef });
  areYouSure: boolean;

  websocketsService = inject(WebsocketsService);

  options: Partial<TuiSheetDialogOptions<Track | null>>;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly tuiSheetDialogService: TuiSheetDialogService,
  ) {
    this.websocketsService.toggledPlayEvent$.subscribe((val: any) => {
      const trackIdElement = this.audioRefs()
        .map((sd) => sd.nativeElement)
        .find((ref) => ref.id === val.trackId);
      console.log(trackIdElement);
      if (!trackIdElement) return;

      if (val.isPlayling) {
        trackIdElement.play();
        return;
      }

      trackIdElement.pause();
    });
  }

  toggleExpanded(trackId: number) {
    // if (trackId !== this.expandedTrackId && this.expanded) {
    //   this.expanded = true;
    // } else {
    //   this.expanded = !this.expanded;
    // }
    console.log('toggle play');
    this.expandedTrackId = trackId;
    if (!this.expanded) {
      this.websocketsService.emitTogglePlay(false);
      this.expandedTrackId = null;
      return;
    }
  }

  updateCustomTitle(text: string) {
    this.customTitleUpdated.emit(text);
    // this.expanded = false;
  }

  openConfirmationDialog() {
    this.options = {
      offset: 48,
      data: null,
    };
    this.open = true;
    this.areYouSure = true;
  }

  removePlaylistOrTrack(confirmed: boolean) {
    this.isConfirmationDialogOpened = false;
    if (!confirmed) {
      return;
    }
    if (this.selectedTrackId) {
      this.trackRemoved.emit(this.selectedTrackId);
      return;
    }
    this.playlistRemoved.emit();
  }

  removeTrack(observer: any, id: any) {
    this.areYouSure = false;
    this.trackRemoved.emit(id);
    observer.complete();
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

  openContextMenu(track: Track) {
    this.options = {
      offset: 48,
      data: track,
    };
    this.open = true;
  }
}
