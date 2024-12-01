import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {TuiButton} from "@taiga-ui/core";

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [RouterLink, TuiButton],
  templateUrl: './dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  @Input() message = 'Are you sure?';
  @Output() emitDialogClicked = new EventEmitter();
}
