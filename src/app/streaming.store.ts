import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { PLAYLIST_ID_LS_KEY, USERNAME_LS_KEY } from './shared/utils/constants';
import { User } from './shared/utils/interfaces';
import { SnackbarService } from './shared/services/snackbar.service';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { WebsocketsService } from './shared/services/websockets.service';

interface StreamingState {
  roomId: string | null;
  currentUser: User | null;
  otherUsers: Array<User>;
}

const initialState: StreamingState = {
  roomId: null,
  currentUser: null,
  otherUsers: [],
};

export const StreamingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('streaming'),
  withMethods((store, snackbar = inject(SnackbarService)) => ({
    successAlert(message: string) {
      snackbar.success(message);
    },
  })),
  withMethods((store) => ({
    updateRoomId(roomId: string | null) {
      patchState(store, { roomId });
    },
    updateCurrentUser(currentUser: User) {
      patchState(store, { currentUser });
    },
  })),
  withHooks(
    (
      store,
      router = inject(Router),
      websockets = inject(WebsocketsService),
    ) => ({
      onInit() {
        router.events
          .pipe(filter((event) => event instanceof ActivationEnd))
          .subscribe((route) => {
            const playlistId =
              (route as ActivationEnd).snapshot.params['id'] ||
              localStorage.getItem(PLAYLIST_ID_LS_KEY) ||
              '';
            const roomId = playlistId ? 'RID_' + playlistId : null;

            websockets.connect(roomId);
            patchState(store, { roomId });
          });

        websockets.connectedUsersChange$.subscribe((val: any) => {
          if (!val.length) {
            patchState(store, {
              currentUser: null,
              otherUsers: [],
            });
            return;
          }

          if (localStorage.getItem(USERNAME_LS_KEY)) {
            patchState(store, {
              currentUser: {
                id: '123',
                name: localStorage.getItem(USERNAME_LS_KEY)!,
              },
            });
          }

          if (val.length === 1 && !store.currentUser()) {
            localStorage.setItem(USERNAME_LS_KEY, val[0].name);
            patchState(store, {
              currentUser: { id: val[0].id, name: val[0].name },
            });
            return;
          }

          const otherUsers = val
            .filter((user: any) => user.id !== store.currentUser()?.id)
            .map((otherUser: any) => ({
              id: otherUser.id,
              name: otherUser.name,
            }));
          patchState(store, {
            otherUsers: otherUsers,
          });
        });
      },
    }),
  ),
);
