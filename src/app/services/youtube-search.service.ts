import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';

interface Item {
  id: { videoId: string };
  snippet: {
    channelTitle: string;
    title: string;
    thumbnails: any;
  };
}

interface YTData {
  items: Item[];
}

@Injectable({
  providedIn: 'root',
})
export class YoutubeSearchService {
  private readonly httpClient = inject(HttpClient);

  searchYouTubeData(q: string): Observable<any[]> {
    return this.httpClient
      .get<YTData>('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'video',
          key: environment.YT_API_KEY,
          q,
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

  private mappedResults(items: any) {
    return items.map((song: Item) => ({
      ytId: song.id.videoId,
      ytLink: 'https://www.youtube.com/watch?v=' + song.id.videoId,
      channelTitle: song.snippet.channelTitle,
      title: song.snippet.title,
      thumbnails: song.snippet.thumbnails,
    }));
  }
}
