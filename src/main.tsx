import ReactDOM from 'react-dom/client';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.scss';
import { EnterLeaveObserverProvider } from './context/enterLeaveObserverContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ErrorPage,
  VideoDetailsPage,
  CreatorDetialsPage,
  BecomeCreatorPage,
  HomePage,
} from './components/pages';
import { createClient } from '@supabase/supabase-js';
import { env } from './lib/env.ts';
import { Database } from './supabase';
import { AppStoreProvider } from './context/app-store-context';
import { apiV1 } from './api/axios';
import { routes } from './api';
import { Suspense } from 'react';
import { Loader } from './components/elements/loader.tsx';
import { PlayerPage } from './components/pages/player-page';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { routePatterns } from './api/routes.ts';
import {
  AuthorDetailsType,
  VideoDetailsType,
} from './lib/types/flipa-clip-api-types.ts';

export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_API_KEY
);

const router = createBrowserRouter([
  {
    path: routePatterns.home,
    element: <HomePage />,
    handle: {
      from: 'home',
      trackType: 'home',
    },
  },
  {
    path: routePatterns.videos.play,
    element: <PlayerPage />,
    loader: async ({ params }): Promise<VideoDetailsType | null> => {
      if (!params.videoId) {
        return null;
      }

      const { data } = await apiV1
        .get<VideoDetailsType>(routes.videos.one(params.videoId))
        .catch(() => ({ data: null }));

      if (!data) {
        return null;
      }

      return data;
    },
    handle: {
      from: 'movie',
      trackType: 'media',
    },
  },
  {
    path: routePatterns.videos.details,
    element: <VideoDetailsPage />,
    handle: {
      from: 'movie',
      trackType: 'media',
    },
  },
  {
    path: routePatterns.creator.details,
    element: <CreatorDetialsPage />,
    loader: async ({ params }) => {
      if (!params.creatorId) {
        return null;
      }

      const { data } = await apiV1
        .get<AuthorDetailsType>(routes.authors.one(params.creatorId))
        .catch(() => ({ data: null }));

      return data;
    },
    handle: {
      from: 'creator',
      trackType: 'creator',
    },
  },
  {
    path: routePatterns.becomeCreator,
    element: <BecomeCreatorPage />,
    handle: {
      from: 'become-creator',
    },
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Suspense fallback={<Loader />}>
      <AppStoreProvider>
        <EnterLeaveObserverProvider>
          <RouterProvider router={router} />
        </EnterLeaveObserverProvider>
      </AppStoreProvider>
    </Suspense>
  </ErrorBoundary>
);
