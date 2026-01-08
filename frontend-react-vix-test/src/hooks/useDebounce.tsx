import { useEffect, useState } from "react";

export const useDebounce = (
  setValueDelayed: (val: string) => void,
  originalValue?: string,
  delay?: number,
) => {
  const [value, setValue] = useState(originalValue || "");

  useEffect(() => {
    const handler = setTimeout(() => {
      setValueDelayed(value);
      clearTimeout(handler);
    }, delay || 500);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return { value, setValue };
};
