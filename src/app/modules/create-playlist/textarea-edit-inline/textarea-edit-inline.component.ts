import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  viewChild,
} from '@angular/core';
import { GlobalStore } from '../../../global.store';
import { ViewModeEnum } from '../../../shared/utils/enums';

@Component({
  selector: 'app-textarea-edit-inline',
  templateUrl: './textarea-edit-inline.component.html',
  styleUrl: './textarea-edit-inline.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaEditInlineComponent implements AfterViewInit {
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

  MAX_CUSTOM_TITLE_LENGTH = 200;
  tempEntryValue = this._entryValue;
  noCustomTitle = true;
  isEditingMode = false;
  isLongOriginalTitle: boolean;

  readonly store = inject(GlobalStore);
  textareaRef = viewChild('textarea', { read: ElementRef });
  customTitleNotEditable = viewChild('customTitleNotEditable', {
    read: ElementRef,
  });

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const { top } =
      this.customTitleNotEditable()?.nativeElement?.getBoundingClientRect();
    const { bottom } = document
      .querySelector('#original-title')
      ?.getBoundingClientRect()!;
    this.isLongOriginalTitle = bottom > top;
    this.cdr.detectChanges();
  }

  onSave() {
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

  protected readonly ViewModeEnum = ViewModeEnum;
}
