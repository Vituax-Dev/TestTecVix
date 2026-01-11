import { IFormatData } from "../types/socketType";

export const generateMockData = (): IFormatData[] => {
  const data: IFormatData[] = [];
  const now = Date.now();
  for (let i = 0; i < 20; i++) {
    data.push({
      time: new Date(now - (20 - i) * 3000).toLocaleTimeString(),
      value: Math.random() * 100,
    });
  }
  return data;
};
