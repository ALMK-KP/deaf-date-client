import { Track } from '../../shared/utils/interfaces';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { WebsocketsService } from '../../shared/services/websockets.service';

export interface PlayerState {
  isPlaying: boolean;
  selectedTrack: Track | null;
  currentTime: number;
}

const initialState: PlayerState = {
  isPlaying: false,
  selectedTrack: null,
  currentTime: 0,
};

export const PlayerState = signalStore(
  withState(initialState),
  withDevtools('global'),
  withMethods((store, websockets = inject(WebsocketsService)) => {
    const setIsPlaying = (val: boolean) => {
      patchState(store, { isPlaying: val });
      if (!store.selectedTrack()) return;
      websockets.emitTogglePlay(
        store.isPlaying(),
        store.selectedTrack()!,
        store.currentTime(),
      );
    };

    const setCurrentTime = (currentTime: number) => {
      patchState(store, { currentTime });
      if (!store.selectedTrack()) return;
      websockets.emitTogglePlay(
        store.isPlaying(),
        store.selectedTrack()!,
        store.currentTime(),
      );
    };

    const selectTrack = (selectedTrack: Track) => {
      patchState(store, { selectedTrack });
    };

    return {
      setIsPlaying,
      selectTrack,
      setCurrentTime,
    };
  }),
  withHooks((store, websockets = inject(WebsocketsService)) => ({
    onInit() {
      websockets.playerStateChange$.subscribe((res: PlayerState) => {
        patchState(store, {
          isPlaying: res.isPlaying,
          selectedTrack: res.selectedTrack,
          currentTime: res.currentTime,
        });
      });
    },
  })),
);
