import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [],
  templateUrl: './track-list.component.html',
})
export class TrackListComponent {
  @Input() tracks: any = [];
}
