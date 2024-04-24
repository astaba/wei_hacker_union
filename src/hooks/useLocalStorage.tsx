import { useState, useEffect, useRef } from "react";

const useLocalStorage = (
  key: string,
  defaultValue: string,
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState(localStorage.getItem(key) || defaultValue);

  const isMounting = useRef(true);

  useEffect(() => {
    if (isMounting.current) {
      isMounting.current = false;
      return;
    }
    console.log("A: useLocalStorage: How many times do I run at mounting?");
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
