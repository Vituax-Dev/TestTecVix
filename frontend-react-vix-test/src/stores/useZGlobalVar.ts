import { create } from "zustand";
import { IGenericSocket, mockSocket } from "../types/socketType";
import { EOS } from "./useZVMSugestion";

export interface IGlobalVar {
  isOpenSideBar: boolean;
  currentSidebarSelected: {
    label: string | null;
    path?: string;
  };
  isOpenModalUserNotActive: boolean;
  loginTime: Date | string | null;
  updateThisVm: null | number;
  currentIdVM: null | number;
  currentVMName: null | string;
  currentVMOS: null | string | EOS;
  socketRef: IGenericSocket;
  search: null | string;
  searchGlobalHeader: string;
  totalCountVMs: number;
}

const INIT_STATE: IGlobalVar = {
  isOpenSideBar: false,
  currentSidebarSelected: { label: null },
  isOpenModalUserNotActive: false,
  loginTime: null,
  updateThisVm: null,
  currentIdVM: null,
  currentVMName: null,
  currentVMOS: null,
  socketRef: mockSocket,
  search: null,
  searchGlobalHeader: "",
  totalCountVMs: 0,
};

interface IGlobalVarState extends IGlobalVar {
  setIsOpenSideBar: (isOpenSideBar: boolean) => void;
  setCurrentSidebarSelected: (
    value: IGlobalVar["currentSidebarSelected"],
  ) => void;
  setIsOpenModalUserNotActive: (isOpenModalUserNotActive: boolean) => void;
  setLoginTime: (loginTime: Date | string | null) => void;
  setUpdateThisVm: (updateThisVm: number | null) => void;
  setCurrentIdVM: (currentIdVM: number | null) => void;
  setSocketRef: (socketRef: IGenericSocket) => void;
  setCurrentVMName: (currentVMName: string | null) => void;
  setCurrentVMOS: (currentVMOS: EOS | string | null) => void;
  setSearch: (search: string | null) => void;
  setSearchGlobalHeader: (search: string) => void;
  setTotalCountVMs: (totalCountVMs: number) => void;
  setTempPinCodeExpress: (tempPinCodeExpress: string | null) => void;
  resetAll: () => void;
}

export const useZGlobalVar = create<IGlobalVarState>((set) => ({
  ...INIT_STATE,
  setIsOpenSideBar: (isOpenSideBar) =>
    set((state) => ({ ...state, isOpenSideBar })),
  setCurrentSidebarSelected: (currentSidebarSelected) =>
    set((state) => ({ ...state, currentSidebarSelected })),
  setIsOpenModalUserNotActive: (isOpenModalUserNotActive) =>
    set((state) => ({ ...state, isOpenModalUserNotActive })),
  setIdSocket: (idSocket) => set((state) => ({ ...state, idSocket })),
  setLoginTime: (loginTime) => set((state) => ({ ...state, loginTime })),
  setUpdateThisVm: (updateThisVm) =>
    set((state) => ({ ...state, updateThisVm })),
  setCurrentIdVM: (currentIdVM) => set((state) => ({ ...state, currentIdVM })),
  setSocketRef: (socketRef) => set((state) => ({ ...state, socketRef })),
  setCurrentVMName: (currentVMName) =>
    set((state) => ({ ...state, currentVMName })),
  setTerminalIdOpened: (terminalIdOpened) =>
    set((state) => ({ ...state, terminalIdOpened })),
  setSearch: (search) => set((state) => ({ ...state, search })),
  setSearchGlobalHeader: (searchGlobalHeader) =>
    set((state) => ({ ...state, searchGlobalHeader })),
  setTotalCountVMs: (totalCountVMs) =>
    set((state) => ({ ...state, totalCountVMs })),
  setSpiceIdOpened: (spiceIdOpened) =>
    set((state) => ({ ...state, spiceIdOpened })),
  setCurrentVMOS: (currentVMOS) => set((state) => ({ ...state, currentVMOS })),
  setTempPinCodeExpress: (tempPinCodeExpress) =>
    set((state) => ({ ...state, tempPinCodeExpress })),
  resetAll: () => set((state) => ({ ...state, ...INIT_STATE })),
}));
