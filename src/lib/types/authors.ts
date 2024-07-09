import { IdType } from './common.ts';
import { AuthorsStatsType } from './supabase-custom-types.ts';

export type AuthorType = {
  id: IdType;
  bio: string;
  name: string;
  author_site: string;
  external_link: string;
  picture: string;
  stats?: AuthorsStatsType;
};
