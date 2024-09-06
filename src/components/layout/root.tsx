import { Navigate, ScrollRestoration, useOutlet } from 'react-router-dom';
import { useEffect } from 'react';
import { routePatterns } from '../../api/routes.ts';

export const Root = () => {
  const currentOutlet = useOutlet();
  const isApp = navigator.userAgent.includes('FlipaClip');

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return isApp ? (
    <>
      {currentOutlet}
      <ScrollRestoration
        getKey={({ pathname }) => {
          return pathname;
        }}
      />
    </>
  ) : (
    <Navigate to={routePatterns.notSupported} replace />
  );
};
