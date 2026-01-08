import { useWindowSize } from "./useWindowSize";

export const useHookMaxHeight = () => {
  const { height } = useWindowSize();
  const growFactor = height * 0.0007 + 1;
  const flexFactor =
    height > 850
      ? height * 0.02
      : height > 840
        ? height * 0.017
        : height > 790
          ? height * 0.015
          : height * 0.013;
  const alpha = Number(((flexFactor * growFactor + 11) / 100).toFixed(4));

  return {
    height,
    alpha,
    maxHeight: `${height * alpha}px`,
  };
};
