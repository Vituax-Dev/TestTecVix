import { useEffect, useRef } from "react";
import { useZGlobalVar } from "../stores/useZGlobalVar";

export const useCloseMenuTimed = (time: number = 300) => {
  const { setIsOpenSideBar, isOpenSideBar } = useZGlobalVar();
  const refTime = useRef<number>(0);

  const closeMenuTimed = () => {
    refTime.current = window.setTimeout(() => {
      setIsOpenSideBar(false);
      clearTimeout(refTime.current);
    }, time);
  };

  useEffect(() => {
    if (isOpenSideBar) closeMenuTimed();
  }, []);

  return { isOpenSideBar, refTime, time };
};
