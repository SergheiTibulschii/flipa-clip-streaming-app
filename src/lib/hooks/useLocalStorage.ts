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
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const remove = () => {
    try {
      setValue(null);
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [value, storageKey]);

  return {
    value,
    set,
    remove,
  };
};
