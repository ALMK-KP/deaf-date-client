import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackListModule } from '../track-list/track-list.module';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';
import { ViewPlaylistComponent } from './view-playlist.component';

@NgModule({
  declarations: [ViewPlaylistComponent],
  imports: [CommonModule, TrackListModule, TuiButton, RouterLink],
  exports: [ViewPlaylistComponent],
})
export class ViewPlaylistModule {}
