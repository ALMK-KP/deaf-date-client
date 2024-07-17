import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-description-input',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './custom-description-input.component.html',
})
export class CustomDescriptionInputComponent implements OnInit {
  @Input() initialValue = '';
  customDescription = new FormControl<string>('');

  clearSearchQuery() {
    this.customDescription.setValue('');
  }

  ngOnInit() {
    this.customDescription.setValue(this.initialValue);
  }
}
