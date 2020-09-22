import { useEffect, useRef } from 'react';

type ICallback<A extends unknown[]> = (...args: A) => void;

export const useDebouncedCallback = <A extends unknown[]>(
  callback: ICallback<A>,
  msec: number,
): ((...args: A) => void) => {
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  useEffect(cleanup, []);

  return function debouncedCallback(...args: A) {
    argsRef.current = args;

    cleanup();

    timeout.current = setTimeout(() => {
      if (argsRef.current) {
        callback(...argsRef.current);
      }
    }, msec);
  };
};
