import { atom } from 'jotai';
import { apiV1 } from '../../../api/axios';
import { routes } from '../../../api';
import { loadable } from 'jotai/utils';
import { HomePageType } from '../../types/flipa-clip-api-types.ts';

export const homePageAtom = atom(async () => {
  const { data, status } = await apiV1.get<HomePageType>(routes.home);

  if (status !== 200) {
    throw new Error('Failed to fetch home page data');
  }

  return data;
});

export const loadableHomePageAtom = loadable(homePageAtom);
