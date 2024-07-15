import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { PLAYLIST_ID_LS_KEY } from '../utils/constants';

interface Item {
  id: { videoId: string };
  snippet: {
    channelTitle: string;
    title: string;
    thumbnails: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private readonly httpClient = inject(HttpClient);

  saveTrackToPlaylist(track: any): Observable<any[]> {
    const playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    return this.httpClient
      .post<any>(`${environment.BE_URL}/tracks/add`, {
        ...track,
        playlistId,
      })
      .pipe(
        tap((val) => console.log(val)),
        tap((val: any) =>
          localStorage.setItem(PLAYLIST_ID_LS_KEY, val.playlistId),
        ),
      );
  }

  getPlaylist(id: string, mode: 'FULL' | 'ENCODED'): Observable<any[]> {
    return this.httpClient
      .get<any>(`${environment.BE_URL}/playlist/${id}`, {
        params: { mode },
      })
      .pipe(tap((val) => console.log(val)));
  }

  private mappedResults(items: any) {
    return items.map((song: Item) => ({
      link: 'https://www.youtube.com/watch?v=' + song.id.videoId,
      channelTitle: song.snippet.channelTitle,
      title: song.snippet.title,
      thumbnails: song.snippet.thumbnails,
    }));
  }
}
