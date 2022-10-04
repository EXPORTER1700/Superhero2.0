import { useRef } from 'react';

export const useDebounce = () => {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (callback: () => void, ms: number) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(callback, ms);
  };
};
