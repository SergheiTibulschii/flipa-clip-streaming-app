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
  VimeoVideoPlayerPage,
} from './components/pages';
import { Bootstrap } from './components/bootstrap.tsx';
import { createClient } from '@supabase/supabase-js';
import { env } from './lib/env.ts';
import { Database } from './supabase';
import { getOrCreateUserId } from './lib/utils/getOrCreateUserId.ts';
import { VideoDetailsLoaderType } from './lib/types/video-details-types.ts';
import { AppStoreProvider } from './context/app-store-context';
import { getUserVideoLike } from './lib/supabase/getUserVideoLike.ts';
import { getVideoStats } from './lib/supabase/getVideoStats.ts';

export const supabase = createClient<Database>(
  env.VITE_SUPABASE_URL,
  env.VITE_SUPABASE_API_KEY
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/video/:videoId',
    element: <VideoDetailsPage />,
    loader: async ({ params }): Promise<VideoDetailsLoaderType> => {
      if (!params.videoId) {
        return {
          video_id: '',
          views_count: 0,
          likes_count: 0,
          author_id: '',
          isLiked: false,
        };
      }
      const userId = await getOrCreateUserId();

      const [likesData, videoStatsData] = await Promise.all([
        getUserVideoLike(params.videoId, userId),
        getVideoStats(params.videoId),
      ]);

      if (likesData.error || videoStatsData.error) {
        if (process.env.NODE_ENV === 'development') {
          console.error({
            likesDataError: likesData.error,
            videoStatsDataError: videoStatsData.error,
          });
        }

        return {
          isLiked: likesData.error ? false : !!likesData.data,
          ...(videoStatsData.error
            ? {
                video_id: params.videoId,
                views_count: 0,
                likes_count: 0,
                author_id: '',
              }
            : videoStatsData.data),
        };
      }

      return {
        isLiked: !!likesData.data,
        ...videoStatsData.data,
      };
    },
  },
  {
    path: '/video/:videoId/play',
    element: <VimeoVideoPlayerPage />,
  },
  {
    path: '/creator/:creatorId',
    element: <CreatorDetialsPage />,
  },
  {
    path: '/become-creator',
    element: <BecomeCreatorPage />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppStoreProvider>
    <EnterLeaveObserverProvider>
      <Bootstrap />
      <RouterProvider router={router} />
    </EnterLeaveObserverProvider>
  </AppStoreProvider>
);
