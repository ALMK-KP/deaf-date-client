import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import {
  adjectives,
  animals,
  uniqueNamesGenerator,
} from 'unique-names-generator';
import { ConnectedUsersChangeResponse, Track } from '../utils/interfaces';
import { PlayerState } from '../../modules/track-list/player.state';

@Injectable({
  providedIn: 'root',
})
export class WebsocketsService {
  private socket: Socket<any>;
  private _toggledPlayEvent$ = new Subject();
  private _connectedUsersChange$ = new Subject<ConnectedUsersChangeResponse>();
  private _socketIdChange$ = new Subject<string>();
  private _playerStateChange$ = new Subject<PlayerState>();

  toggledPlayEvent$ = this._toggledPlayEvent$.asObservable();
  connectedUsersChange$ = this._connectedUsersChange$.asObservable();
  socketIdChange$ = this._socketIdChange$.asObservable();
  playerStateChange$ = this._playerStateChange$.asObservable();

  connect(roomId: string | null, username: string) {
    this.socket = io(environment.WEBSOCKETS_SERVER_URL, {
      query: {
        roomId,
        username: username,
      },
    });

    this.socket.on('connect', () => {
      if (!this.socket.id) return;
      this._socketIdChange$.next(this.socket.id);
    });

    this.socket.on(
      'CONNECTED_USERS_CHANGE',
      (res: ConnectedUsersChangeResponse) => {
        this._connectedUsersChange$.next(res);
      },
    );

    this.socket.on('TOGGLE_PLAY_EVENT', (res: PlayerState) => {
      this._playerStateChange$.next(res);
    });
  }

  emitTogglePlay(
    isPlaying: boolean,
    selectedTrack: Track,
    currentTime: number,
  ) {
    this.socket.emit('TOGGLE_PLAY_EVENT', {
      isPlaying,
      selectedTrack,
      currentTime,
    });
  }

  getRandomUsername() {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, animals],
      separator: ' ',
      style: 'capital',
    });
  }
}
