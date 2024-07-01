import { createContext, useContext } from 'react';

export const contextFactory = <A>() => {
  const context = createContext<A>({} as A);
  const useCtx = () => useContext(context);

  return [useCtx, context] as const;
};
