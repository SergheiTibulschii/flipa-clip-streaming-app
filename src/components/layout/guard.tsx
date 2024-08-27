import { Navigate, Outlet } from 'react-router-dom';
import { routePatterns } from '../../api/routes.ts';

export const Guard = () => {
  const isApp = navigator.userAgent.includes('FlipaClip');

  return isApp ? <Outlet /> : <Navigate to={routePatterns.notSupported} />;
};
