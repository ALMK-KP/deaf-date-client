import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { GlobalStore } from '../../../global.store';

import { ViewModeEnum } from '../../../shared/utils/enums';
import { Track } from '../../../shared/utils/interfaces';

import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrl: './track-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListItemComponent {
  @Input() track: Track;
  @Input() orderId: number;
  @Output() trackSelected = new EventEmitter();
  @Output() handleOnPlayEmitter = new EventEmitter();
  @Output() handleOnPauseEmitter = new EventEmitter();
  readonly store = inject(GlobalStore);
  isPlaying = false;
  dragging = false;
  viewModeEnum = ViewModeEnum;
  selectedToPlayTrackId: number;
  selectedTrackSrc: string;
  hoveredId: number | null;
  open: boolean;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly dialogHelper: DialogService,
  ) {}

  toggleDragging(value: boolean) {
    this.dragging = value;
  }

  isMode(mode: ViewModeEnum) {
    return this.store.mode() === mode;
  }

  onHovered(hovered: boolean, track: Track) {
    this.hoveredId = hovered ? track.id : null;
  }

  selectTrack() {
    this.trackSelected.emit(this.track);
  }

  openTrackContextMenuDialog(track: Track) {
    this.dialogHelper.openTrackContextMenuDialog(track);
  }
}
