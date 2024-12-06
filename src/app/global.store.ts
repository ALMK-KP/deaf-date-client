import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { TracksService } from './services/tracks.service';
import { inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { PLAYLIST_ID_LS_KEY } from './utils/constants';
import { KnowledgeLevelEnum, ViewModeEnum } from './utils/enums';
import { Track, Response } from './utils/interfaces';

interface GlobalState {
  isLoading: boolean;
  isAddingTrackLoading: boolean;
  mode: ViewModeEnum;
  tracks: Array<Track>;
  playlistId: string;
}

const initialState: GlobalState = {
  isLoading: true,
  isAddingTrackLoading: false,
  mode: ViewModeEnum.ENCODED,
  tracks: [],
  playlistId: '',
};

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('global'),
  withMethods((store, tracksService = inject(TracksService)) => ({
    updateMode(mode: ViewModeEnum) {
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
      const tracks: Response<Track> = await tracksService.updateCustomTitle(
        trackId,
        customTitle,
      );
      patchState(store, { tracks: tracks.data, isLoading: false });
    },
    async addTrackToPlaylist(track: Track) {
      patchState(store, { isLoading: true, isAddingTrackLoading: true });
      const tracks: Response<Track> =
        await tracksService.saveTrackToPlaylist(track);
      const playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY);
      if (!playlistId) {
        patchState(store, { isLoading: false, isAddingTrackLoading: false });
        return;
      }
      patchState(store, {
        tracks: tracks.data,
        playlistId,
        isLoading: false,
        isAddingTrackLoading: false,
      });
    },
    async loadTracks(knowledgeLevel: KnowledgeLevelEnum): Promise<void> {
      patchState(store, { isLoading: true });
      if (!store.playlistId()) {
        patchState(store, { tracks: [], isLoading: false });
      } else {
        const tracks: Response<Track> = await tracksService.getPlaylist(
          store.playlistId(),
          knowledgeLevel,
        );
        console.log(tracks);
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
    async removeTrack(trackId: number) {
      if (store.playlistId()) {
        patchState(store, { isLoading: true });
        const { data: tracks }: Response<Track> =
          await tracksService.removeTrack(trackId);
        const playlistId = tracks.length ? store.playlistId() : '';
        patchState(store, { tracks, playlistId, isLoading: false });
        if (!playlistId) {
          localStorage.removeItem(PLAYLIST_ID_LS_KEY);
        }
      }
    },
    async reorderTracks(playlistId: string, reorderedTracks: Array<Track>) {
      patchState(store, { isLoading: true });
      const tracks: Response<Track> = await tracksService.reorderTracks(
        playlistId,
        reorderedTracks,
      );
      patchState(store, { tracks: tracks.data, isLoading: false });
    },
  })),
);
