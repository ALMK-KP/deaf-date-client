import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment';

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
export class YoutubeDataService {
  private readonly httpClient = inject(HttpClient);

  searchYouTubeData(q: string): Observable<any> {
    return this.httpClient
      .get<YTData>('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          type: 'video',
          key: environment.YT_API_KEY,
          q,
        },
      })
      .pipe(map((data) => this.mappedResults(data.items)));
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
