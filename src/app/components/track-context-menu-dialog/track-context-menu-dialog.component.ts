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
import { TuiSheetDialog, TuiSheetDialogOptions } from '@taiga-ui/addon-mobile';
import { DialogService } from '../../services/dialog.service';
import { PolymorpheusTemplate } from '@taiga-ui/polymorpheus';
import { TuiButton } from '@taiga-ui/core';
import { GlobalStore } from '../../global.store';
import { TextareaEditInlineComponent } from '../textarea-edit-inline/textarea-edit-inline.component';

@Component({
  selector: 'app-track-context-menu-dialog',
  standalone: true,
  templateUrl: './track-context-menu-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    TuiSheetDialog,
    PolymorpheusTemplate,
    TuiButton,
    TextareaEditInlineComponent,
  ],
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
