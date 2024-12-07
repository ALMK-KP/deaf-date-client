import { Track } from '../../shared/utils/interfaces';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';

interface PlayerState {
  isPlaying: boolean;
  selectedTrack: Track | null;
}

const initialState: PlayerState = {
  isPlaying: false,
  selectedTrack: null,
};

export const PlayerState = signalStore(
  withState(initialState),
  withDevtools('global'),
  withMethods((store) => {
    const setIsPlaying = (val: boolean) => {
      patchState(store, { isPlaying: val });
    };

    const selectTrack = (selectedTrack: Track) => {
      patchState(store, { selectedTrack, isPlaying: true });
    };

    return {
      setIsPlaying,
      selectTrack,
    };
  }),
);
