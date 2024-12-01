import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
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
import { ButtonComponent } from '../button/button.component';
import { ViewModeEnum } from '../../utils/enums';
import { Track } from '../../utils/interfaces';
import { io } from 'socket.io-client';
import { WebsocketsService } from '../../services/websockets.service';

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
    ButtonComponent,
    CdkDropListGroup,
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
  audioRefs = viewChildren<ElementRef>('audio');

  websocketsService = inject(WebsocketsService);

  constructor() {
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

  openConfirmationDialog(dropEvent?: CdkDragDrop<any, any>) {
    this.dragging = false;
    this.isConfirmationDialogOpened = true;
    if (dropEvent) {
      this.selectedTrackId = this.store.tracks()[dropEvent.previousIndex].id;
    }
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
}
