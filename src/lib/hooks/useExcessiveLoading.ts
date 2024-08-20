import { useEffect, useState } from 'react';

export const useExcessiveLoading = (cancel: boolean) => {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    let t: NodeJS.Timeout | null = null;

    if (!cancel) {
      t = setTimeout(() => {
        setTriggered(true);
      }, 2000);

      return () => {
        if (t) {
          clearTimeout(t);
        }
      };
    } else if (cancel && t) {
      clearTimeout(t);
    }
  }, [cancel]);

  return triggered;
};
