import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Output,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { TuiSheetDialogOptions } from '@taiga-ui/addon-mobile';
import { DialogService } from '../../../shared/services/dialog.service';
import { GlobalStore } from '../../../global.store';

@Component({
  selector: 'app-track-context-menu-dialog',
  templateUrl: './track-context-menu-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackContextMenuDialogComponent {
  options: Partial<TuiSheetDialogOptions<any>>;
  isOpened = false;
  isConfirmationMode = false;

  @Output() removeTrackEmitter = new EventEmitter();

  labelRef = viewChild('labelRef', { read: TemplateRef });

  store = inject(GlobalStore);

  constructor(
    private readonly dialogHelper: DialogService,
    private readonly cdr: ChangeDetectorRef,
  ) {
    this.dialogHelper.trackContextMenuDialogOptions$.subscribe(
      (dialogOptions) => {
        if (!dialogOptions) return;

        this.options = { label: this.labelRef(), ...dialogOptions };
        this.isOpened = true;
        this.cdr.markForCheck();
      },
    );
  }

  dialogClosed() {
    this.isConfirmationMode = false;
  }
}
