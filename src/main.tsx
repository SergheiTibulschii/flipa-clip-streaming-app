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
import { Bootstrap } from './components/bootstrap.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/video/:videoId',
    element: <VideoDetailsPage />,
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
  <EnterLeaveObserverProvider>
    <Bootstrap />
    <RouterProvider router={router} />
  </EnterLeaveObserverProvider>
);
