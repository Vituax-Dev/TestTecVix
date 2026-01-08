import { useEffect, useRef } from "react";

export const useRefFocusEffect = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const inputElement = inputRef.current;

    if (inputElement) {
      const handleFocus = () => {
        inputElement.select();
      };

      inputElement.addEventListener("focus", handleFocus);

      return () => {
        inputElement.removeEventListener("focus", handleFocus);
      };
    }
  }, []);

  return {
    inputRef,
  };
};
