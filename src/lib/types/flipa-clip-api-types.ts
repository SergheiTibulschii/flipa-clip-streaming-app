interface Video {
  id: string;
  poster_artwork: string;
  title: string;
}

export interface Featured {
  id: string;
  featured_artwork: string;
  featured_preview: string;
  title: string;
  description?: string;
  author: Creator;
}

export interface Section {
  title: string;
  content: Content[];
}

export interface Content {
  id: string;
  poster_artwork: string;
  title: string;
  author: Creator;
}

export interface Creator {
  id: string;
  avatar: string;
  banner: string;
  bio: string;
  name: string;
}

export interface Suggestion {
  id: string;
  poster_artwork: string;
  title: string;
  author_id: string;
}

export interface Action {
  title: string;
  link: string;
  type: 0 | 1;
}

export interface AuthorDetailsType {
  id: string;
  bio: string;
  name: string;
  avatar: string;
  banner: string;
  videos: Video[];
  actions: Action[];
  creators: Creator[];
}

export interface VideoDetailsType {
  id: string;
  video_source: string;
  title: string;
  share_url: string;
  video_artwork: string;
  author_id: string;
  description: string;
  featured_preview: string;
  featured_artwork: string;
  poster_artwork: string;
  media_artwork: string;
  tag: string;
  suggestions: Suggestion[];
  actions: Action[];
}

export interface HomePageType {
  featured: Featured[];
  sections: Section[];
  creators: Creator[];
}
