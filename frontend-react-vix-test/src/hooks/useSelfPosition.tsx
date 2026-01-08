import { useEffect, useRef, useState } from "react";

export const useSelfPosition = (openModalSlider: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const calcPosition = () => {
    if (ref.current) {
      const { top, left, height } = ref.current.getBoundingClientRect();
      let calculatedX = left - 24;
      const calculatedY = top + height - 18;
      const screenWidth = window.innerWidth;
      const modalWidth = 360;
      if (calculatedX + modalWidth > screenWidth) {
        calculatedX = screenWidth - modalWidth;
      }

      setPosition({ x: calculatedX, y: calculatedY });
    }
  };

  useEffect(() => {
    if (!openModalSlider) return setPosition({ x: 0, y: 0 });
    if (!ref) return setPosition({ x: 0, y: 0 });
    if (!ref.current) return setPosition({ x: 0, y: 0 });
    calcPosition();
    window.addEventListener("resize", calcPosition);
    return () => {
      window.removeEventListener("resize", calcPosition);
    };
  }, [ref, openModalSlider]);

  return { ref, position };
};
