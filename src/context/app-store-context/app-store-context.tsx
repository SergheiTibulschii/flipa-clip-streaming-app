import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { getOrCreateUserId } from '../../lib/utils/getOrCreateUserId.ts';
import { AppStoreContext, AppStoreMethodsContext } from './context.ts';
import { useScrollbarWidth } from '../../lib/hooks/useScrollbarWidth.ts';
import { useAtomValue } from 'jotai/index';
import { videosWithDefaultLoadable } from '../../lib/jotai/atoms/videos';
import { Loader } from '../../components/elements/loader.tsx';
import { MainLayout } from '../../components/layout';
import { Container } from '../../components/layout/container';
import { Typography } from '../../components/ui/typography';
import { text } from '../../lib/text.ts';

export const AppStoreProvider = ({ children }: PropsWithChildren) => {
  const videos = useAtomValue(videosWithDefaultLoadable);
  const [userId, setUserId] = useState<string>('');
  useScrollbarWidth();

  useEffect(() => {
    getOrCreateUserId().then((id) => {
      setUserId(id);
    });
  }, []);

  const contextValue = useMemo(() => ({ userId }), [userId]);

  const contextMethodsValue = useMemo(() => ({}), []);

  if (videos.state === 'loading') {
    return <Loader />;
  }

  if (videos.state === 'hasError') {
    return (
      <MainLayout>
        <Container>
          <Typography className="mt-10" variant="h4">
            {text.applicationError}
          </Typography>
        </Container>
      </MainLayout>
    );
  }

  return (
    <AppStoreMethodsContext.Provider value={contextMethodsValue}>
      <AppStoreContext.Provider value={contextValue}>
        {children}
      </AppStoreContext.Provider>
    </AppStoreMethodsContext.Provider>
  );
};
