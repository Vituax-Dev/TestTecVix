import { create } from "zustand";
import {
  IBrandMasterBasicInfo,
} from "../types/BrandMasterTypes";

export type Colaborator = {
  idUser: string;
  name: string;
  fullName?: string;
  username?: string;
  email: string;
  phone?: string;
  position?: string;
  department?: string;
  permission: "admin" | "manager" | "member";
  hiringDate?: string | Date | null;
  status: "active" | "inactive";
  lastActivity: string | Date | null;
  profileImgUrl?: string | null;
  idBrandMaster?: number | null;
  brandName?: string;
};

export interface ColaboratorRegisterInputs {
  idUser?: string | null;
  colaboratorName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  permission: string;
  hiringDate: string;
  status: string;
  errorMessage: boolean;
  idBrandMaster?: number | null;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const INPUTS_INITIAL_STATE: ColaboratorRegisterInputs = {
  idUser: null,
  colaboratorName: "",
  email: "",
  phone: "",
  position: "",
  department: "",
  permission: "",
  hiringDate: "",
  status: "",
  errorMessage: false,
  idBrandMaster: null,
  username: "",
  password: "",
  confirmPassword: "",
};

type editingInfos = {
  index: number;
  permission: "admin" | "manager" | "member";
  status: "active" | "inactive";
};

interface IColaboratorRegister extends ColaboratorRegisterInputs {
  users: Colaborator[];
  isEditing: number[];
  editInfos: editingInfos[];
  colaboratorNameFilter: string;
  companyNameFilter: string;
  currentTabIndex: number;
  search: string;
  page: number;
  limit: number;
  totalCount: number;
  selectedMSP: IBrandMasterBasicInfo | null;
  filterCompanyId: number | null;
  userToDelete: Colaborator | null;
  isEditingMode: boolean;
}

const INITIAL_STATE: IColaboratorRegister = {
  ...INPUTS_INITIAL_STATE,
  users: [],
  isEditing: [],
  editInfos: [],
  colaboratorNameFilter: "",
  companyNameFilter: "",
  currentTabIndex: 0,
  search: "",
  page: 1,
  limit: 4,
  totalCount: 0,
  selectedMSP: null,
  filterCompanyId: null,
  userToDelete: null,
  isEditingMode: false,
};

interface IColaboratorRegisterState extends IColaboratorRegister {
  resetInputs: () => void;
  setIdUser: (id: string) => void;
  setColaboratorName: (colaboratorName: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setPosition: (position: string) => void;
  setDepartment: (department: string) => void;
  setPermission: (permission: string) => void;
  setHiringDate: (hiringDate: string) => void;
  setStatus: (status: string) => void;
  setUsers: (users: Colaborator[]) => void;
  setIsEditing: (index: number[]) => void;
  setEditInfos: (editingInfos: editingInfos[]) => void;
  setColaboratorNameFilter: (colaboratorNameFilter: string) => void;
  setCompanyNameFilter: (companyNameFilter: string) => void;
  setErrorMessage: (errorMessage: boolean) => void;
  setIdBrandMaster: (idBrandMaster: number | null) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
  setCurrentTabIndex: (currentTabIndex: number) => void;
  resetAll: () => void;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setTotalCount: (totalCount: number) => void;
  setSelectedMSP: (selectedMSP: IBrandMasterBasicInfo | null) => void;
  setFilterCompanyId: (filterCompanyId: number | null) => void;
  setUserToDelete: (userToDelete: Colaborator | null) => void;
  setIsEditingMode: (isEditingMode: boolean) => void;
  fillFormForEdit: (user: Colaborator) => void;
}

export const useZColaboratorRegister = create<IColaboratorRegisterState>(
  (set) => ({
    ...INITIAL_STATE,
    resetInputs: () => set((state) => ({ ...state, ...INPUTS_INITIAL_STATE })),
    setColaboratorName: (colaboratorName: string) =>
      set((state) => ({ ...state, colaboratorName })),
    setEmail: (email: string) => set((state) => ({ ...state, email })),
    setPhone: (phone: string) => set((state) => ({ ...state, phone })),
    setPosition: (position: string) => set((state) => ({ ...state, position })),
    setDepartment: (department: string) =>
      set((state) => ({ ...state, department })),
    setPermission: (permission: string) =>
      set((state) => ({ ...state, permission })),
    setHiringDate: (hiringDate: string) =>
      set((state) => ({ ...state, hiringDate })),
    setStatus: (status: string) => set((state) => ({ ...state, status })),
    setUsers: (users: Colaborator[]) => set((state) => ({ ...state, users })),
    setIsEditing: (newEditing: number[]) =>
      set((state) => ({ ...state, isEditing: [...newEditing] })),
    setEditInfos: (editingInfos: editingInfos[]) =>
      set((state) => ({ ...state, editInfos: [...editingInfos] })),
    setColaboratorNameFilter: (colaboratorNameFilter: string) =>
      set((state) => ({ ...state, colaboratorNameFilter })),
    setCompanyNameFilter: (companyNameFilter: string) =>
      set((state) => ({ ...state, companyNameFilter })),
    setIdUser: (id: string) => set((state) => ({ ...state, idUser: id })),
    setErrorMessage: (errorMessage: boolean) =>
      set((state) => ({ ...state, errorMessage })),
    setIdBrandMaster: (idBrandMaster: number | null) =>
      set((state) => ({ ...state, idBrandMaster: idBrandMaster })),
    setUsername: (username: string) =>
      set((state) => ({ ...state, username: username })),
    setPassword: (password: string) =>
      set((state) => ({ ...state, password: password })),
    setConfirmPassword: (confirmPassword: string) =>
      set((state) => ({ ...state, confirmPassword: confirmPassword })),
    setCurrentTabIndex: (currentTabIndex: number) =>
      set((state) => ({ ...state, currentTabIndex: currentTabIndex })),
    setPage: (page: number) => set((state) => ({ ...state, page: page })),
    setSearch: (search: string) =>
      set((state) => ({ ...state, search: search })),
    setTotalCount: (totalCount: number) =>
      set((state) => ({ ...state, totalCount: totalCount })),
    setSelectedMSP: (selectedMSP: IBrandMasterBasicInfo | null) =>
      set((state) => ({ ...state, selectedMSP: selectedMSP })),
    setFilterCompanyId: (filterCompanyId: number | null) =>
      set((state) => ({ ...state, filterCompanyId: filterCompanyId })),
    setUserToDelete: (userToDelete: Colaborator | null) =>
      set((state) => ({ ...state, userToDelete })),
    setIsEditingMode: (isEditingMode: boolean) =>
      set((state) => ({ ...state, isEditingMode })),
    fillFormForEdit: (user: Colaborator) =>
      set((state) => ({
        ...state,
        idUser: user.idUser,
        colaboratorName: user.fullName || user.name || "",
        email: user.email,
        phone: user.phone || "",
        username: user.username || "",
        position: user.position || "",
        department: user.department || "",
        permission: user.permission,
        status: user.status,
        hiringDate: user.hiringDate ? new Date(user.hiringDate).toISOString().split("T")[0] : "",
        idBrandMaster: user.idBrandMaster || null,
        selectedMSP: user.idBrandMaster ? { idBrandMaster: user.idBrandMaster, brandName: user.brandName || "" } : null,
        isEditingMode: true,
        password: "",
        confirmPassword: "",
      })),

    resetAll: () => set((state) => ({ ...state, ...INITIAL_STATE })),
  }),
);
