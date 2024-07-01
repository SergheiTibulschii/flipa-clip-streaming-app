import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { getOrCreateUserId } from '../../lib/utils/getOrCreateUserId.ts';
import { AppStoreContext, AppStoreMethodsContext } from './context.ts';

export const AppStoreProvider = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<string>('');
  /* request creators list along with total views */
  /* request videos for sliders along with likes and views per video  */
  /* initialize the state which holds counters for videos and creators total views */

  useEffect(() => {
    getOrCreateUserId().then((id) => {
      setUserId(id);
    });
  }, []);

  const contextValue = useMemo(() => ({ userId }), [userId]);

  const contextMethodsValue = useMemo(() => ({}), []);

  return (
    <AppStoreMethodsContext.Provider value={contextMethodsValue}>
      <AppStoreContext.Provider value={contextValue}>
        {children}
      </AppStoreContext.Provider>
    </AppStoreMethodsContext.Provider>
  );
};
