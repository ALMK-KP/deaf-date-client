import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  SearchedYouTubeTrack,
  YouTubeData,
  YouTubeItem,
} from '../utils/interfaces';

@Injectable({
  providedIn: 'root',
})
export class YoutubeSearchService {
  private readonly httpClient = inject(HttpClient);

  searchYouTubeData(query: string): Observable<Array<SearchedYouTubeTrack>> {
    return this.httpClient
      .get<YouTubeData>('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'video',
          key: environment.YT_API_KEY,
          q: query,
        },
      })
      .pipe(
        tap((val) => console.log(val)),
        map((data) => this.mappedResults(data.items)),
      );
    //
    // return of([
    //   {
    //     ytLink: 'https://www.youtube.com/watch?v=',
    //     ytId: 'qwer',
    //     channelTitle: 'song.snippet.channelTitle',
    //     title: 'song.snippet.title',
    //     thumbnails: {
    //       default: {
    //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP5Qd7cIWGWhNeP9AJ2VEHDEJRPVJToVa8ag&s',
    //       },
    //     },
    //   },
    // ]);
  }

  private mappedResults(
    items: Array<YouTubeItem>,
  ): Array<SearchedYouTubeTrack> {
    return items.map((item: YouTubeItem) => ({
      ytId: item.id.videoId,
      ytLink: 'https://www.youtube.com/watch?v=' + item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
    }));
  }
}
