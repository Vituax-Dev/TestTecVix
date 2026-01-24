import { create } from "zustand";
import { IGenericOptionsTyped, TOptions } from "../types/FormType";
import { MIN_PASS_SIZE } from "../configs/contants";
import { genStrongPass } from "../utils/genStrongPass";
import { ENetworkType } from "../types/VMTypes";
import { EOS } from "./useZVMSugestion";

export interface IVMForm {
  vmSO: IGenericOptionsTyped<EOS> | null;
  isOpenVMMarketPlace: boolean;
  vmPassword: string;
  vmName: string;
  vmvCpu: number;
  vmMemory: number;
  vmDisk: number;
  vmLocalization: TOptions | null;
  hasBackup: boolean;
  vmNetwork: IGenericOptionsTyped<ENetworkType> | null;
  openConfirm: boolean;
  searchMarketPlace: string;
  category: TOptions;
  isOpenModalDetails: boolean;
  currentISOVM: object | null;
  orderBy: TOptions;
}

const INIT_STATE: IVMForm = {
  vmSO: null,
  isOpenVMMarketPlace: false,
  vmPassword: genStrongPass(MIN_PASS_SIZE),
  vmName: "",
  vmvCpu: 1,
  vmMemory: 1,
  vmDisk: 20,
  vmLocalization: null,
  hasBackup: false,
  vmNetwork: null,
  openConfirm: false,
  searchMarketPlace: "",
  category: null,
  isOpenModalDetails: false,
  currentISOVM: null,
  orderBy: null,
};

interface IVMFormState extends IVMForm {
  setVmSO(vmSO: IGenericOptionsTyped<EOS> | null): void;
  setIsOpenVMMarketPlace(isOpenVMMarketPlace: boolean): void;
  setVmPassword(vmPassword: string): void;
  newRandomPassword: () => void;
  setVmName(vmName: string): void;
  setVmvCpu(vmvCpu: number): void;
  setVmMemory(vmMemory: number): void;
  setVmDisk(vmDisk: number): void;
  setVmLocalization(vmLocalization: TOptions | null): void;
  setHasBackup(hasBackup: boolean): void;
  setVmNetwork(vmNetwork: IGenericOptionsTyped<ENetworkType> | null): void;
  setOpenConfirm(openConfirm: boolean): void;
  setSearchMarketPlace: (str: string) => void;
  setCategory: (category: TOptions) => void;
  setIsOpenModalDetails: (isOpenModalDetails: boolean) => void;
  setCurrentISOVM: (currentISOVM: object | null) => void;
  setOrderBy: (orderBy: TOptions) => void;
  resetAll: () => void;
}

export const useZVM = create<IVMFormState>((set) => ({
  ...INIT_STATE,
  setVmSO: (vmSO) => set((state) => ({ ...state, vmSO })),
  setIsOpenVMMarketPlace: (isOpenVMMarketPlace) =>
    set((state) => ({ ...state, isOpenVMMarketPlace })),
  setVmPassword: (vmPassword) => set((state) => ({ ...state, vmPassword })),
  newRandomPassword: () =>
    set((state) => ({ ...state, vmPassword: genStrongPass(MIN_PASS_SIZE) })),
  setVmName: (vmName) => set((state) => ({ ...state, vmName })),
  setVmvCpu: (vmvCpu) => set((state) => ({ ...state, vmvCpu })),
  setVmMemory: (vmMemory) => set((state) => ({ ...state, vmMemory })),
  setVmDisk: (vmDisk) => set((state) => ({ ...state, vmDisk })),
  setVmLocalization: (vmLocalization) =>
    set((state) => ({ ...state, vmLocalization })),
  setHasBackup: (hasBackup) => set((state) => ({ ...state, hasBackup })),
  setVmNetwork: (vmNetwork) => set((state) => ({ ...state, vmNetwork })),
  setOpenConfirm: (openConfirm) => set((state) => ({ ...state, openConfirm })),
  setSearchMarketPlace: (str) =>
    set((state) => ({ ...state, searchMarketPlace: str })),
  setCategory: (category) => set((state) => ({ ...state, category })),
  setIsOpenModalDetails: (isOpenModalDetails) =>
    set((state) => ({ ...state, isOpenModalDetails })),
  setCurrentISOVM: (currentISOVM) =>
    set((state) => ({ ...state, currentISOVM })),
  setOrderBy: (orderBy) => set((state) => ({ ...state, orderBy })),
  resetAll: () => set((state) => ({ ...state, ...INIT_STATE })),
}));
