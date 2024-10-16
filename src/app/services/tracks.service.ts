import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { PLAYLIST_ID_LS_KEY } from '../utils/constants';
import { KnowledgeLevelEnum } from '../utils/enums';
import { Track, Response } from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private readonly httpClient = inject(HttpClient);

  saveTrackToPlaylist(track: Track): Promise<Response<Track>> {
    const playlistId = localStorage.getItem(PLAYLIST_ID_LS_KEY) || null;
    return lastValueFrom(
      this.httpClient
        .post<Response<Track>>(`${environment.BE_URL}/tracks/add`, {
          ...track,
          playlistId,
        })
        .pipe(
          tap((val: Response<Track>) =>
            localStorage.setItem(PLAYLIST_ID_LS_KEY, val.playlistId),
          ),
        ),
    );
  }

  getPlaylist(
    id: string,
    knowledgeLevel: KnowledgeLevelEnum,
  ): Promise<Response<Track>> {
    return lastValueFrom(
      this.httpClient.get<Response<Track>>(
        `${environment.BE_URL}/playlist/${id}`,
        {
          params: { knowledgeLevel },
        },
      ),
    );
  }

  updateCustomTitle(id: number, customTitle: string): Promise<Response<Track>> {
    return lastValueFrom(
      this.httpClient.put<Response<Track>>(
        `${environment.BE_URL}/tracks/${id}`,
        {
          customTitle,
        },
      ),
    );
  }

  removePlaylist(id: string): Promise<Response<Track>> {
    return lastValueFrom(
      this.httpClient.delete<Response<Track>>(
        `${environment.BE_URL}/playlist/${id}`,
      ),
    );
  }

  reorderTracks(
    id: string,
    reorderedTracks: Array<Track>,
  ): Promise<Response<Track>> {
    return lastValueFrom(
      this.httpClient.put<Response<Track>>(
        `${environment.BE_URL}/playlist/${id}`,
        {
          reorderedTracks,
        },
      ),
    );
  }

  removeTrack(id: number): Promise<Response<Track>> {
    return lastValueFrom(
      this.httpClient.delete<Response<Track>>(
        `${environment.BE_URL}/tracks/${id}`,
      ),
    );
  }
}
