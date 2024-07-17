import { Component, Input } from '@angular/core';
import { CustomDescriptionInputComponent } from '../custom-description-input/custom-description-input.component';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CustomDescriptionInputComponent],
  templateUrl: './track-list.component.html',
})
export class TrackListComponent {
  @Input() tracks: any = [];
  @Input() mode: 'ENCODED' | 'DECODED' | 'CREATION' = 'CREATION';
  expanded = false;
  expandedTrackId: number | null = null;

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
}
