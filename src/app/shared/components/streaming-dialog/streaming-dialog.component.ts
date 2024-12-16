import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { TuiSheetDialog, TuiSheetDialogOptions } from '@taiga-ui/addon-mobile';
import { DialogService } from '../../services/dialog.service';
import { GlobalStore } from '../../../global.store';
import { ViewModeEnum } from '../../utils/enums';
import { TuiButton } from '@taiga-ui/core';
import { StreamingStore } from '../../../streaming.store';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-streaming-dialog',
  standalone: true,
  templateUrl: './streaming-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TuiButton, TuiSheetDialog, NgIf],
})
export class StreamingDialogComponent {
  options: Partial<TuiSheetDialogOptions<any>>;
  isOpened = false;
  isConfirmationMode = false;

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

  dialogClosed() {
    this.isConfirmationMode = false;
  }

  protected readonly ViewModeEnum = ViewModeEnum;
}
