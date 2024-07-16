import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [],
  templateUrl: './track-list.component.html',
})
export class TrackListComponent {
  @Input() tracks: any = [];
  @Input() encoded = false;
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
}
