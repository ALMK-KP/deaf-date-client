import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output,
} from '@angular/core';
import { GlobalStore } from '../../global.store';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ConfirmDialogActionEnum,
  ViewModeEnum,
} from '../../shared/utils/enums';
import { Track } from '../../shared/utils/interfaces';
import { WebsocketsService } from '../../shared/services/websockets.service';
import { DialogService } from '../../shared/services/dialog.service';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackListComponent {
  @Output() playlistRemoved = new EventEmitter();
  @Output() tracksReordered = new EventEmitter();
  readonly store = inject(GlobalStore);
  dragging = false;
  viewModeEnum = ViewModeEnum;
  open: boolean;

  websocketsService = inject(WebsocketsService);

  constructor(
    private readonly cdr: ChangeDetectorRef,
    private readonly dialogHelper: DialogService,
  ) {
    this.websocketsService.toggledPlayEvent$.subscribe((val: any) => {
      console.log(val);
    });
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
}
