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
import { ConnectedUsersChangeResponse, User } from './shared/utils/interfaces';
import { ActivationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { WebsocketsService } from './shared/services/websockets.service';

interface StreamingState {
  roomId: string | null;
  currentUserId: string | null;
  currentUserName: string | null;
  otherUsers: Array<User>;
}

const initialState: StreamingState = {
  roomId: null,
  currentUserId: null,
  currentUserName: null,
  otherUsers: [],
};

export const StreamingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withDevtools('streaming'),
  withMethods((store) => ({
    updateRoomId(roomId: string | null) {
      patchState(store, { roomId });
    },
  })),
  withHooks(
    (
      store,
      router = inject(Router),
      websockets = inject(WebsocketsService),
    ) => ({
      onInit() {
        websockets.socketIdChange$.subscribe((id: string) => {
          patchState(store, {
            currentUserId: id,
          });
        });

        websockets.connectedUsersChange$.subscribe(
          (response: ConnectedUsersChangeResponse) => {
            const otherUsersInThisRoom = response.users.filter(
              (user: User) => user.id !== store.currentUserId(),
            );
            patchState(store, {
              otherUsers: otherUsersInThisRoom,
            });
          },
        );

        router.events
          .pipe(filter((event) => event instanceof ActivationEnd))
          .subscribe((route) => {
            const playlistId =
              (route as ActivationEnd).snapshot.params['id'] ||
              localStorage.getItem(PLAYLIST_ID_LS_KEY) ||
              '';
            const roomId = playlistId ? 'RID_' + playlistId.toString() : '';
            const username =
              localStorage.getItem(USERNAME_LS_KEY) ||
              websockets.getRandomUsername();
            localStorage.setItem(USERNAME_LS_KEY, username);

            patchState(store, {
              roomId,
              currentUserName: username,
            });
            websockets.connect(roomId, username);
          });
      },
    }),
  ),
);
