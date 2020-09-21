import { useState, useRef, useEffect } from 'react';

export const useLocalStorageState = <T>(
  key: string,
  defaultValue: T,
): readonly [T, (v: T) => void] => {
  const getItem = <T>(key: string, defaultValue: T): T => {
    try {
      return JSON.parse(window.localStorage.getItem(key) || '');
    } catch (err) {
      return defaultValue;
    }
  };

  const setItem = (key: string, value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  };
  const [value, setValue] = useState<T>(getItem(key, defaultValue));

  // Prevent double calls on initial render
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    setItem(key, value);
  }, [key, value]);

  return [value, setValue] as const;
};
