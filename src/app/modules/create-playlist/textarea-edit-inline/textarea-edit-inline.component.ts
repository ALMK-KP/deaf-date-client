import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  viewChild,
} from '@angular/core';
import { GlobalStore } from '../../../global.store';

@Component({
  selector: 'app-textarea-edit-inline',
  templateUrl: './textarea-edit-inline.component.html',
  styleUrl: './textarea-edit-inline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaEditInlineComponent {
  @Input()
  set entryValue(val: string) {
    if (val) {
      this._entryValue = val;
      this.tempEntryValue = val;
      this.noCustomTitle = false;
      return;
    }
  }
  @Output() valueChangedEmitter = new EventEmitter();
  private readonly noCustomTitleConst = 'No custom title';
  private _entryValue = this.noCustomTitleConst;

  tempEntryValue = this._entryValue;
  noCustomTitle = true;
  isEditingMode = false;

  readonly store = inject(GlobalStore);
  textareaRef = viewChild('textarea', { read: ElementRef });

  onBlur() {
    if (!this.tempEntryValue) {
      this.tempEntryValue = this.noCustomTitleConst;
    }

    this.noCustomTitle = this.tempEntryValue === this.noCustomTitleConst;
    this.isEditingMode = false;

    if (this.tempEntryValue === this._entryValue) return;

    this.valueChangedEmitter.emit(
      this.tempEntryValue === this.noCustomTitleConst
        ? ''
        : this.tempEntryValue,
    );
  }

  enterEditingMode() {
    this.isEditingMode = true;
    this.textareaRef()?.nativeElement.focus();
  }
}
