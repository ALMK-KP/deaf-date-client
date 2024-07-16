import { Routes } from '@angular/router';
import { CreatePlaylistComponent } from './components/create-playlist/create-playlist.component';
import { EncodedPlaylistComponent } from './components/encoded-playlist/encoded-playlist.component';
import { DecodedPlaylistComponent } from './components/decoded-playlist/decoded-playlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: CreatePlaylistComponent },
  { path: 'encoded/:id', component: EncodedPlaylistComponent },
  { path: 'decoded/:id', component: DecodedPlaylistComponent },
];
