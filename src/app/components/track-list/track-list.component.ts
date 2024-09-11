import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { CustomDescriptionInputComponent } from '../custom-description-input/custom-description-input.component';
import { DialogComponent } from '../dialog/dialog.component';
import {GlobalStore} from "../../global.store";

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CustomDescriptionInputComponent, DialogComponent],
  templateUrl: './track-list.component.html',
  styles: `
   :host {
     flex-grow: 1;
     height: 100%;
     display: flex;
     flex-direction: column;
   }
  `
})
export class TrackListComponent {
  @Output() customTitleUpdated = new EventEmitter();
  @Output() playlistRemoved = new EventEmitter();
  readonly store = inject(GlobalStore);
  expanded = false;
  expandedTrackId: number | null = null;
  isConfirmationDialogOpened = false;

  toggleExpanded(trackId: number) {
    if (trackId !== this.expandedTrackId && this.expanded) {
      this.expanded = true;
    } else {
      this.expanded = !this.expanded;
    }
    this.expandedTrackId = trackId;
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
}
