import { create } from "zustand";
import { IFormatData } from "../types/socketType";

// Store para gerenciar dados de gráficos por VM
interface IVMChartDataEntry {
  cpu: IFormatData[];
  memory: IFormatData[];
  disk: number; // Disco é um valor fixo/lento crescimento
}

interface IVMChartDataState {
  vmChartData: Map<number, IVMChartDataEntry>;
  getVMChartData: (vmId: number) => IVMChartDataEntry;
  updateCpuData: (vmId: number, data: IFormatData) => void;
  updateMemoryData: (vmId: number, data: IFormatData) => void;
  updateDiskData: (vmId: number, value: number) => void;
  initializeVMData: (vmId: number) => void;
  clearVMData: (vmId: number) => void;
}

const MAX_DATA_POINTS = 20;

// Gera dados iniciais mockados para uma VM
const generateInitialData = (
  baseValue: number,
  variance: number
): IFormatData[] => {
  const now = new Date();
  return Array.from({ length: 10 }, (_, i) => {
    const time = new Date(now.getTime() - (10 - i) * 2000);
    const value = Math.max(
      0,
      Math.min(100, baseValue + (Math.random() - 0.5) * variance)
    );
    return {
      time: time.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      value,
    };
  });
};

// Gera próximo valor baseado no anterior (transição suave)
export const generateNextValue = (
  prevValue: number,
  minValue: number,
  maxValue: number,
  maxChange: number = 5
): number => {
  const change = (Math.random() - 0.5) * maxChange * 2;
  let newValue = prevValue + change;

  // Tendência de voltar para o meio do range
  const midPoint = (minValue + maxValue) / 2;
  const pullToCenter = (midPoint - newValue) * 0.1;
  newValue += pullToCenter;

  return Math.max(minValue, Math.min(maxValue, newValue));
};

const createDefaultEntry = (): IVMChartDataEntry => ({
  cpu: generateInitialData(45, 30), // CPU começa ~45% com variação de 30
  memory: generateInitialData(55, 25), // Memória começa ~55% com variação de 25
  disk: 30 + Math.random() * 40, // Disco entre 30-70%
});

export const useZVMChartData = create<IVMChartDataState>((set, get) => ({
  vmChartData: new Map(),

  getVMChartData: (vmId: number) => {
    const data = get().vmChartData.get(vmId);
    if (!data) {
      // Inicializa se não existir
      get().initializeVMData(vmId);
      return get().vmChartData.get(vmId) || createDefaultEntry();
    }
    return data;
  },

  initializeVMData: (vmId: number) => {
    set((state) => {
      const newMap = new Map(state.vmChartData);
      if (!newMap.has(vmId)) {
        newMap.set(vmId, createDefaultEntry());
      }
      return { vmChartData: newMap };
    });
  },

  updateCpuData: (vmId: number, data: IFormatData) => {
    set((state) => {
      const newMap = new Map(state.vmChartData);
      const vmData = newMap.get(vmId) || createDefaultEntry();
      const newCpu = [...vmData.cpu, data].slice(-MAX_DATA_POINTS);
      newMap.set(vmId, { ...vmData, cpu: newCpu });
      return { vmChartData: newMap };
    });
  },

  updateMemoryData: (vmId: number, data: IFormatData) => {
    set((state) => {
      const newMap = new Map(state.vmChartData);
      const vmData = newMap.get(vmId) || createDefaultEntry();
      const newMemory = [...vmData.memory, data].slice(-MAX_DATA_POINTS);
      newMap.set(vmId, { ...vmData, memory: newMemory });
      return { vmChartData: newMap };
    });
  },

  updateDiskData: (vmId: number, value: number) => {
    set((state) => {
      const newMap = new Map(state.vmChartData);
      const vmData = newMap.get(vmId) || createDefaultEntry();
      newMap.set(vmId, { ...vmData, disk: value });
      return { vmChartData: newMap };
    });
  },

  clearVMData: (vmId: number) => {
    set((state) => {
      const newMap = new Map(state.vmChartData);
      newMap.delete(vmId);
      return { vmChartData: newMap };
    });
  },
}));
