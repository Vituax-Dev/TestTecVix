import { create } from "zustand";
import { IVMCreatedResponse } from "../types/VMTypes";

export enum SortByParams {
  NAME = "vmName",
  STATUS = "status",
  CPU = "vCPU",
  RAM = "ram",
  DISK = "disk",
  SOP = "os",
  COMPANY = "company",
}

export type Order = "asc" | "desc";

interface IVMList {
  vmList: IVMCreatedResponse[];
  totalCount: number;
  currentPage: number;
  search: string | null;
  currentVM: null | IVMCreatedResponse;
  orderBy: SortByParams | null;
  order: Order | null;
  limit: number;
  companyId: number | null;
  onlyBrandMaster: boolean;
  status: string | undefined;
  isFirstLoading: boolean;
  selectedMSP: { idBrandMaster: number | null; brandName: string } | null;
  selectedCompany: {
    idCompany: number | null;
    companyName: string;
    brandId: number;
  } | null;
  onlyMyVMs: boolean;
  msps: {
    idBrandMaster: number;
    brandName: string;
    deletedAt?: Date | string | null;
  }[];
  companies: {
    idCompany: number;
    companyName: string;
    brandId: number;
    deletedAt?: Date | string | null;
  }[];
}

const INIT_STATE: IVMList = {
  vmList: [],
  totalCount: 0,
  currentPage: 1,
  search: null,
  currentVM: null,
  orderBy: null,
  order: null,
  limit: 10,
  companyId: null,
  onlyBrandMaster: false,
  status: undefined,
  isFirstLoading: true,
  selectedMSP: null,
  selectedCompany: null,
  onlyMyVMs: false,
  msps: [],
  companies: [],
};

interface IVMListState extends IVMList {
  setVMList: (vmList: IVMCreatedResponse[]) => void;
  setTotalCount: (totalCount: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setSearch: (search: string | null) => void;
  setCurrentVM: (currentVM: null | IVMCreatedResponse) => void;
  setOrderBy: (orderBy: SortByParams | null) => void;
  setOrder: (order: Order | null) => void;
  setIdCompany: (idCompany: number | null) => void;
  setOlyBrandMaster: (onlyBrandMaster: boolean) => void;
  setStatus: (status: string | undefined) => void;
  setIsFirstLoading: (isFirstLoading: boolean) => void;
  setSelectedMSP: (
    selectedMSP: null | { idBrandMaster: number; brandName: string },
  ) => void;
  setSelectedCompany: (
    selectedCompany: null | {
      idCompany: number;
      companyName: string;
      brandId: number;
    },
  ) => void;
  setOnlyMyVMs: (onlyMyVMs: boolean) => void;
  setMsps: (msps: { idBrandMaster: number; brandName: string }[]) => void;
  setCompanies: (
    companies: { idCompany: number; companyName: string; brandId: number }[],
  ) => void;
  resetAll: () => void;
}

export const useZMyVMsList = create<IVMListState>((set) => ({
  ...INIT_STATE,
  setVMList: (vmList) => set((state) => ({ ...state, vmList })),
  setTotalCount: (totalCount) => set((state) => ({ ...state, totalCount })),
  setCurrentPage: (currentPage) => set((state) => ({ ...state, currentPage })),
  setSearch: (search) => set((state) => ({ ...state, search })),
  setCurrentVM: (currentVM) => set((state) => ({ ...state, currentVM })),
  setOrderBy: (orderBy) => set((state) => ({ ...state, orderBy })),
  setOrder: (order) => set((state) => ({ ...state, order })),
  setIdCompany: (idCompany) =>
    set((state) => ({ ...state, companyId: idCompany })),
  setOlyBrandMaster: (onlyBrandMaster) =>
    set((state) => ({ ...state, onlyBrandMaster })),
  setStatus: (status) => set((state) => ({ ...state, status })),
  setIsFirstLoading: (isFirstLoading) =>
    set((state) => ({ ...state, isFirstLoading })),
  resetAll: () => set((state) => ({ ...state, ...INIT_STATE })),
  setSelectedMSP: (selectedMSP) => set((state) => ({ ...state, selectedMSP })),
  setSelectedCompany: (selectedCompany) =>
    set((state) => ({ ...state, selectedCompany })),
  setOnlyMyVMs: (onlyMyVMs) => set((state) => ({ ...state, onlyMyVMs })),
  setMsps: (msps) => set((state) => ({ ...state, msps })),
  setCompanies: (companies) => set((state) => ({ ...state, companies })),
}));
