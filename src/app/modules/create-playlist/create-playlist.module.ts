import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePlaylistComponent } from './create-playlist.component';
import { TrackListModule } from '../track-list/track-list.module';
import { SearchForTrackComponent } from './search-for-track/search-for-track.component';
import { RouterLink } from '@angular/router';
import { TuiInputModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TuiButton, TuiDataListComponent, TuiDataListDirective} from '@taiga-ui/core';

@NgModule({
  declarations: [CreatePlaylistComponent, SearchForTrackComponent],
  imports: [
    // NG
    RouterLink,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    // Custom
    TrackListModule,
    // Lib
    TuiInputModule,
    TuiDataListComponent,
    TuiDataListDirective,
    TuiTextfieldControllerModule,
    TuiButton,
  ],
})
export class CreatePlaylistModule {}
