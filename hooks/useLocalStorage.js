import { useState, useEffect } from 'react';

//const ('selectedRoute', 'Paget & Warwick')

export function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    }
    return initialValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}