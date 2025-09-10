import { useState, useEffect } from 'react';
import { APP_CONSTANTS } from '../config/constants';

/**
 * Custom hook for debouncing values
 * @param value - The value to debounce
 * @param delay - The delay in milliseconds (optional, defaults to APP_CONSTANTS.DEBOUNCE_DELAY)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay || APP_CONSTANTS.DEBOUNCE_DELAY);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}