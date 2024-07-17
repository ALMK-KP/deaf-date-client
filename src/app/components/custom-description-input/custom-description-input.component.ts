import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-description-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './custom-description-input.component.html',
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
