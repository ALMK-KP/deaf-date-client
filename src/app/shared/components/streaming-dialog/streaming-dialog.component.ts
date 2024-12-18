import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { TuiSheetDialog, TuiSheetDialogOptions } from '@taiga-ui/addon-mobile';
import { DialogService } from '../../services/dialog.service';
import { ViewModeEnum } from '../../utils/enums';
import { TuiButton } from '@taiga-ui/core';
import { StreamingStore } from '../../../streaming.store';
import { NgIf } from '@angular/common';
import { TuiStatus } from '@taiga-ui/kit';

@Component({
  selector: 'app-streaming-dialog',
  standalone: true,
  templateUrl: './streaming-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton, TuiSheetDialog, NgIf, TuiStatus],
})
export class StreamingDialogComponent {
  isOpened = false;

  streamingStore = inject(StreamingStore);

  constructor(
    private readonly dialogHelper: DialogService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.dialogHelper.openStreamingDialog$.subscribe((val: boolean) => {
      if (!val) return;

      this.isOpened = true;
      this.cdr.markForCheck();
    });
  }
}
