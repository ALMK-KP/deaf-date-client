import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { TuiButton } from '@taiga-ui/core';
import { TuiSheetDialog, TuiSheetDialogOptions } from '@taiga-ui/addon-mobile';
import { DialogService } from '../../services/dialog.service';
import { ConfirmDialogData } from '../../utils/interfaces';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [RouterLink, TuiButton, TuiSheetDialog],
  templateUrl: './confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  options: Partial<TuiSheetDialogOptions<ConfirmDialogData>>;
  isOpened = false;

  constructor(
    private readonly dialogHelper: DialogService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.dialogHelper.confirmDialogOptions$.subscribe((dialogOptions) => {
      if (!dialogOptions) return;

      this.options = dialogOptions;
      this.isOpened = true;
      this.cdr.markForCheck();
    });
  }

  confirmAction() {
    this.dialogHelper.confirmDialogAction$.next(this.options.data!.actionType);
  }
}
