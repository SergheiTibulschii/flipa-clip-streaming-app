import { contextFactory } from '../context-factory.ts';

type VimeoContextType = {
  play: (source: string) => void;
};

export const [useVimeo, VimeoContext] = contextFactory<VimeoContextType>();
