import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
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
export class TrackListItemComponent implements OnInit {
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

  ngOnInit() {
    if (this.orderId === 0) {
      this.player.selectTrack(this.track);
    }
  }

  toggleDragging(value: boolean) {
    this.dragging = value;
  }

  isMode(mode: ViewModeEnum) {
    return this.store.mode() === mode;
  }

  onDesktopHovered(hovered: boolean) {
    if (this.store.isMobile()) return;

    this.hoveredId = hovered ? this.track.id : null;
  }

  onMobileClicked() {
    if (!this.store.isMobile()) return;

    this.player.selectTrack(this.track);
  }

  openTrackContextMenuDialog(event: Event) {
    event.stopPropagation();
    this.dialogHelper.openTrackContextMenuDialog(this.track);
  }

  disableDefaultContextMenu(event: Event) {
    event.preventDefault();
  }

  selectTrack() {
    this.player.selectTrack(this.track);
    this.player.setIsPlaying(true);
  }
}
