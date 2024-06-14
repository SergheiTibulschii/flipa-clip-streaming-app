import ReactDOM from 'react-dom/client';
import 'swiper/css';
import 'swiper/css/navigation';
import './index.scss';
import { EnterLeaveObserverProvider } from './context/enterLeaveObserverContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './components/pages/error-page.tsx';
import { VideoDetailsPage } from './components/pages/video-details-page';
import { CreatorDetialsPage } from './components/pages/creator-detials-page';
import { BecomeCreatorPage } from './components/pages/become-creator-page.tsx';
import { HomePage } from './components/pages/home-page';
import { Bootstrap } from './components/bootstrap.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/video/:videoId',
    element: <VideoDetailsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/creator/:creatorId',
    element: <CreatorDetialsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/become-creator',
    element: <BecomeCreatorPage />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <EnterLeaveObserverProvider>
    <Bootstrap />
    <RouterProvider router={router} />
  </EnterLeaveObserverProvider>
);
