export interface Track {
  id: number;
  audio: string;
  customTitle: string;
  order: number;
  ytId?: string;
  ytLink?: string;
  playlistId?: string;
  thumbnail?: string;
  title?: string;
}

export interface Response<T> {
  data: Array<T>;
  playlistId: string;
}

export interface SearchedYouTubeTrack {
  ytId: string;
  ytLink: string;
  title: string;
  thumbnails?: {
    default: YouTubeThumbnail;
    high: YouTubeThumbnail;
    medium: YouTubeThumbnail;
  };
  thumbnail?: string;
}

export interface YouTubeThumbnail {
  width: number;
  height: number;
  url: string;
}

export interface YouTubeItem {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: {
      default: YouTubeThumbnail;
      high: YouTubeThumbnail;
      medium: YouTubeThumbnail;
    };
  };
}

export interface YouTubeData {
  items: Array<YouTubeItem>;
}
