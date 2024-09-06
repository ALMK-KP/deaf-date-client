import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TracksService } from './services/tracks.service';
import { inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { PLAYLIST_ID_LS_KEY } from './utils/constants';

interface GlobalState {
  isLoading: boolean;
  mode: 'ENCODED' | 'DECODED' | 'CREATION';
  tracks: any[];
  playlistId: string;
}

const initialState: GlobalState = {
  isLoading: true,
  mode: 'ENCODED',
  tracks: [],
  playlistId: '',
};

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('global'),
  withMethods((store, tracksService = inject(TracksService)) => ({
    updateMode(mode: 'ENCODED' | 'DECODED' | 'CREATION') {
      patchState(store, { mode });
    },
    updatePlaylistId(playlistId: string) {
      patchState(store, { playlistId });
    },
    resetPlaylist() {
      patchState(store, { tracks: [], playlistId: '' });
    },
    async updateTrack(trackId: number, customTitle: string) {
      patchState(store, { isLoading: true });
      const tracks: any = await tracksService.updateCustomTitle(
        trackId,
        customTitle,
      );
      patchState(store, { tracks: tracks.data, isLoading: false });
    },
    async addTrackToPlaylist(track: any) {
      patchState(store, { isLoading: true });
      const tracks: any = await tracksService.saveTrackToPlaylist(track);
      patchState(store, { tracks: tracks.data, isLoading: false });
    },
    async loadTracks(knowledgeLevel: 'ENCODED' | 'FULL'): Promise<void> {
      patchState(store, { isLoading: true });
      if (!store.playlistId()) {
        patchState(store, { tracks: [], isLoading: false });
      } else {
        const tracks: any = await tracksService.getPlaylist(
          store.playlistId(),
          knowledgeLevel,
        );
        patchState(store, { tracks: tracks.data, isLoading: false });
      }
    },
    async removePlaylist() {
      if (store.playlistId()) {
        patchState(store, { isLoading: true });
        localStorage.removeItem(PLAYLIST_ID_LS_KEY);
        await tracksService.removePlaylist(store.playlistId());
        patchState(store, { tracks: [], playlistId: '', isLoading: false });
      }
    },
  })),
);
