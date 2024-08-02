import { Featured, HomePageType } from './flipa-clip-api-types.ts';

export type HomePageDataType = Pick<HomePageType, 'creators' | 'sections'> & {
  featured: Featured;
};
