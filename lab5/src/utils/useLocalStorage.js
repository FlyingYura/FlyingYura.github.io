import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (JSON.stringify(value) !== storedValue) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);
  
  return [value, setValue];
};

export default useLocalStorage;