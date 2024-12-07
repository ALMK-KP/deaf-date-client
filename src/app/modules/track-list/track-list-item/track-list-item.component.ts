import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
} from '@angular/core';
import { GlobalStore } from '../../../global.store';

import { ViewModeEnum } from '../../../shared/utils/enums';
import { Track } from '../../../shared/utils/interfaces';

import { DialogService } from '../../../shared/services/dialog.service';
import { PlayerState } from '../player.state';

@Component({
  selector: 'app-track-list-item',
  templateUrl: './track-list-item.component.html',
  styleUrl: './track-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListItemComponent {
  @Input() track: Track;
  @Input() orderId: number;
  dragging = false;
  viewModeEnum = ViewModeEnum;
  hoveredId: number | null;

  readonly store = inject(GlobalStore);
  readonly player = inject(PlayerState);

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

  openTrackContextMenuDialog(track: Track) {
    this.dialogHelper.openTrackContextMenuDialog(track);
  }
}
