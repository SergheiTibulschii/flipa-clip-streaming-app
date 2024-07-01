import { useAtomValue } from 'jotai';
import { authorsWithDefaultLoadable } from '../jotai/atoms/authors.ts';

export const useSupabaseAuthor = (authorId: string) => {
  const authors = useAtomValue(authorsWithDefaultLoadable);

  return (
    (authors.state !== 'loading' &&
      authors.state !== 'hasError' &&
      authors.data.find((author) => author.author_id === authorId)) ||
    null
  );
};
