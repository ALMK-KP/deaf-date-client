import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecodedPlaylistComponent } from './decoded-playlist/decoded-playlist.component';
import { EncodedPlaylistComponent } from './encoded-playlist/encoded-playlist.component';
import { TrackListModule } from '../track-list/track-list.module';
import { TuiButton } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [DecodedPlaylistComponent, EncodedPlaylistComponent],
  imports: [CommonModule, TrackListModule, TuiButton, RouterLink],
  exports: [DecodedPlaylistComponent, EncodedPlaylistComponent],
})
export class ViewPlaylistModule {}
