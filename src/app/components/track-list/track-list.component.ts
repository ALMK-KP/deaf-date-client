import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomDescriptionInputComponent } from '../custom-description-input/custom-description-input.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CustomDescriptionInputComponent, DialogComponent],
  templateUrl: './track-list.component.html',
})
export class TrackListComponent {
  @Input() tracks: any = [];
  @Input() mode: 'ENCODED' | 'DECODED' | 'CREATION' = 'CREATION';
  @Output() customTitleUpdated = new EventEmitter();
  @Output() playlistRemoved = new EventEmitter();
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

  getInitialValueOfCustomTitle(customTitle: string) {
    if (customTitle === '####') return '';
    return customTitle;
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
