import { IFormatData } from "../types/socketType";

export const generateMockChartData = (
  vmId: number | null,
  type: "cpu" | "memory"
): IFormatData[] => {
  if (!vmId) return [];

  const seed = vmId * (type === "cpu" ? 1 : 2);

  const seededRandom = (n: number) => {
    const x = Math.sin(seed + n) * 10000;
    return x - Math.floor(x);
  };

  const baseValue = type === "cpu" ? 30 + (seed % 40) : 40 + (seed % 30);
  const variance = type === "cpu" ? 25 : 20;

  const data: IFormatData[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const time = new Date(now.getTime() - (11 - i) * 5000);
    const timeStr = time.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const randomVariation = (seededRandom(i) - 0.5) * variance;
    const value = Math.max(0, Math.min(100, baseValue + randomVariation));

    data.push({
      time: timeStr,
      value: Number(value.toFixed(2)),
    });
  }

  return data;
};
