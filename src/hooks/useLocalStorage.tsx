import { useState, useEffect } from "react";

const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(localStorage[key] || defaultValue);

  useEffect(() => {
    localStorage[key] = value;
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
