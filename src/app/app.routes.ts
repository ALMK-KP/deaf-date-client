import { Routes } from '@angular/router';
import { CreatePlaylistComponent } from './modules/create-playlist/create-playlist.component';
import { ViewModeEnum } from './shared/utils/enums';
import { ViewPlaylistComponent } from './modules/view-playlist/view-playlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full' },
  { path: 'create', component: CreatePlaylistComponent },
  {
    path: 'encoded/:id',
    component: ViewPlaylistComponent,
    data: { mode: ViewModeEnum.ENCODED },
  },
  {
    path: 'decoded/:id',
    component: ViewPlaylistComponent,
    data: { mode: ViewModeEnum.DECODED },
  },
];
