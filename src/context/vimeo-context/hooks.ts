import { useContext } from 'react';
import { VimeoContext } from './vimeo-context.tsx';

export const useVimeoPlayer = () => useContext(VimeoContext);
