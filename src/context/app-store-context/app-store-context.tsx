import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { getOrCreateUserId } from '../../lib/utils/getOrCreateUserId.ts';
import { AppStoreContext, AppStoreMethodsContext } from './context.ts';
import { useScrollbarWidth } from '../../lib/hooks/useScrollbarWidth.ts';

export const AppStoreProvider = ({ children }: PropsWithChildren) => {
  const [userId, setUserId] = useState<string>('');
  useScrollbarWidth();

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
