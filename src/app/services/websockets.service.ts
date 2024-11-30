import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketsService {
  private socket: Socket<any>;
  private _toggledPlayEvent$ = new Subject();
  private _connectedUsersChange$ = new Subject();

  toggledPlayEvent$ = this._toggledPlayEvent$.asObservable();
  connectedUsersChange$ = this._connectedUsersChange$.asObservable();

  constructor() {
    this.socket = io(environment.WEBSOCKETS_SERVER_URL);

    this.socket.on('TOGGLE_PLAY_EVENT', (val: any) => {
      this._toggledPlayEvent$.next(val);
    });

    this.socket.on('CONNECTED_USERS_CHANGE', (val: number) => {
      this._connectedUsersChange$.next(val);
    });
  }

  emitTogglePlay(payload: any) {
    this.socket.emit('TOGGLE_PLAY_EVENT', payload);
  }
}
