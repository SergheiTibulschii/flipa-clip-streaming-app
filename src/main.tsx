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
import { Suspense } from 'react';
import { Loader } from './components/elements/loader.tsx';
import { PlayerPage } from './components/pages/player-page';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { routePatterns } from './api/routes.ts';
import { Root } from './components/layout/root.tsx';
import { SWRConfig } from 'swr';

export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_API_KEY
);

const router = createBrowserRouter([
  {
    path: routePatterns.home,
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
        handle: {
          from: 'home',
          trackType: 'home',
        },
      },
      {
        path: routePatterns.videos.play,
        element: <PlayerPage />,
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <Suspense fallback={<Loader />}>
      <AppStoreProvider>
        <EnterLeaveObserverProvider>
          <SWRConfig
            value={{
              refreshInterval: 1000 * 60 * 20,
              revalidateOnReconnect: false,
              revalidateIfStale: true,
              revalidateOnFocus: false,
            }}
          >
            <RouterProvider router={router} />
          </SWRConfig>
        </EnterLeaveObserverProvider>
      </AppStoreProvider>
    </Suspense>
  </ErrorBoundary>
);
