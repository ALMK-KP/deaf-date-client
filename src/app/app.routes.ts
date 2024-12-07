import { Routes } from '@angular/router';
import { CreatePlaylistComponent } from './modules/create-playlist/create-playlist.component';
import { EncodedPlaylistComponent } from './modules/view-playlist/encoded-playlist/encoded-playlist.component';
import { DecodedPlaylistComponent } from './modules/view-playlist/decoded-playlist/decoded-playlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: CreatePlaylistComponent },
  { path: 'encoded/:id', component: EncodedPlaylistComponent },
  { path: 'decoded/:id', component: DecodedPlaylistComponent },
];
