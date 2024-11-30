import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-custom-description-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent],
  templateUrl: './custom-description-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomDescriptionInputComponent implements OnInit {
  @Input() initialValue = '';
  @Input() trackId: number | null = null;
  @Output() customTitleUpdated = new EventEmitter();
  customDescription = new FormControl<string>('');

  clearSearchQuery() {
    this.customDescription.setValue('');
  }

  ngOnInit() {
    this.customDescription.setValue(this.initialValue);
  }

  updateTrackCustomTitle(value: string) {
    this.customTitleUpdated.emit({
      trackId: this.trackId,
      newCustomTitle: value,
    });
  }
}
