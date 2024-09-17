import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, map, Observable, of, tap } from 'rxjs';
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

  saveTrackToPlaylist(track: any): Promise<any[]> {
    const playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    return lastValueFrom(
      this.httpClient
        .post<any>(`${environment.BE_URL}/tracks/add`, {
          ...track,
          playlistId,
        })
        .pipe(
          tap((val: any) =>
            localStorage.setItem(PLAYLIST_ID_LS_KEY, val.playlistId),
          ),
        ),
    );
  }

  getPlaylist(id: string, mode: 'FULL' | 'ENCODED'): Promise<any[]> {
    return lastValueFrom(
      this.httpClient.get<any>(`${environment.BE_URL}/playlist/${id}`, {
        params: { mode },
      }),
    );
  }

  updateCustomTitle(id: number, customTitle: string): Promise<any[]> {
    return lastValueFrom(
      this.httpClient.put<any>(`${environment.BE_URL}/tracks/${id}`, {
        customTitle,
      }),
    );
  }

  removePlaylist(id: string): Promise<any[]> {
    return lastValueFrom(
      this.httpClient.delete<any>(`${environment.BE_URL}/playlist/${id}`),
    );
  }

  reorderTracks(id: string, reorderedTracks: any): Promise<any> {
    return lastValueFrom(
      this.httpClient.put<any>(`${environment.BE_URL}/playlist/${id}`, {
        reorderedTracks,
      }),
    );
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
