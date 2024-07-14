import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-for-track-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './search-for-track-autocomplete.component.html',
  styleUrl: './search-for-track-autocomplete.component.css',
})
export class SearchForTrackAutocompleteComponent {
  @Input() searchResults: any[] = [];
  @Input() loading = false;
}
