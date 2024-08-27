import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(
  storageKey: string,
  initialValue: T | null = null
) => {
  const [value, setValue] = useState<T | null>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const storedValue = localStorage.getItem(storageKey);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const set = (value: T) => {
    try {
      setValue(value);
      window.localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const remove = () => {
    localStorage.removeItem(storageKey);
    setValue(null);
  };

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);

  return {
    value,
    set,
    remove,
  };
};
