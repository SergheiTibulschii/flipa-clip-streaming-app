import { ScrollRestoration, useOutlet } from 'react-router-dom';
import { useEffect } from 'react';
export const Root = () => {
  const currentOutlet = useOutlet();

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <>
      {currentOutlet}
      <ScrollRestoration
        getKey={({ pathname }) => {
          return pathname;
        }}
      />
    </>
  );
};
