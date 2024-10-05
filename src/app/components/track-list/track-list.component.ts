import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CustomDescriptionInputComponent } from '../custom-description-input/custom-description-input.component';
import { DialogComponent } from '../dialog/dialog.component';
import { GlobalStore } from '../../global.store';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnter,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ButtonComponent } from '../button/button.component';
import { ViewModeEnum } from '../../utils/enums';

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
})
export class TrackListComponent {
  @Output() customTitleUpdated = new EventEmitter();
  @Output() playlistRemoved = new EventEmitter();
  @Output() tracksReordered = new EventEmitter();
  readonly store = inject(GlobalStore);
  expanded = false;
  dragging = false;
  expandedTrackId: number | null = null;
  isConfirmationDialogOpened = false;
  viewModeEnum = ViewModeEnum;

  toggleExpanded(trackId: number) {
    if (trackId !== this.expandedTrackId && this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = !this.expanded;
    }
    this.expandedTrackId = trackId;
    if (!this.expanded) {
      this.expandedTrackId = null;
      return;
    }
  }

  updateCustomTitle(event: any) {
    this.customTitleUpdated.emit(event);
    this.expanded = false;
  }

  openConfirmationDialog() {
    this.isConfirmationDialogOpened = true;
  }

  removePlaylist(confirmed: any) {
    this.isConfirmationDialogOpened = false;
    if (confirmed) {
      this.playlistRemoved.emit();
    }
  }

  drop(event: CdkDragDrop<any[]>) {
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

  removeTrack($event: CdkDragDrop<any, any>) {
    console.log($event);
  }

  toggleDragging(value: boolean) {
    this.dragging = value;
  }

  test($event: CdkDragEnter) {
    console.log($event);
  }

  isMode(mode: ViewModeEnum) {
    return this.store.mode() === mode;
  }
}
