import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForTrackAutocompleteComponent } from './search-for-track-autocomplete.component';

describe('SearchForTrackAutocompleteComponent', () => {
  let component: SearchForTrackAutocompleteComponent;
  let fixture: ComponentFixture<SearchForTrackAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchForTrackAutocompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchForTrackAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
