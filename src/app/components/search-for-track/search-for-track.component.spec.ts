import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForTrackComponent } from './search-for-track.component';

describe('SearchForTrackComponent', () => {
  let component: SearchForTrackComponent;
  let fixture: ComponentFixture<SearchForTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchForTrackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchForTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
