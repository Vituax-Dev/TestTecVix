import { useEffect, useRef } from "react";

export const useRefFocusEffectDelayed = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const selectText = () => {
    const timer = setTimeout(() => {
      const inputElement = inputRef.current;
      if (!inputElement) return clearTimeout(timer);
      inputElement.focus();
      inputElement.select();
    }, 100);
  };

  useEffect(() => {
    selectText();
  }, []);

  return {
    inputRef,
  };
};
