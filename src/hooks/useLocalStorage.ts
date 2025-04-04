import { useState } from 'react';

function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  });

  const setStoredValue = (value: T) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  const removeStoredValue = () => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  };

  return [value, setStoredValue, removeStoredValue] as const;
}

export default useLocalStorage;
