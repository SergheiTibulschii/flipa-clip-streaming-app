import { contextFactory } from '../context-factory.ts';

type AppStoreContextType = {
  userId: string;
};

type AppStoreMethodsType = {};

export const [useAppStore, AppStoreContext] =
  contextFactory<AppStoreContextType>();

export const [useAppStoreMethods, AppStoreMethodsContext] =
  contextFactory<AppStoreMethodsType>();
