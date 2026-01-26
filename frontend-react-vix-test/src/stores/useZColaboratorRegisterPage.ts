import { create } from "zustand";

export interface IUserListItem {
  idUser: string;
  username: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  profileImgUrl: string | null;
  role: "admin" | "manager" | "member";
  idBrandMaster: number | null;
  isActive: boolean;
  lastLoginDate: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
  brandMaster?: {
    brandName: string | null;
    brandLogo: string | null;
  } | null;
  // Campos opcionais que não existem no banco
  position?: string;
  department?: string;
  hiringDate?: string;
}

interface IColaboratorRegisterPage {
  // Form fields
  fullName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  position: string;
  department: string;
  role: "admin" | "manager" | "member";
  hiringDate: string;
  isActive: boolean;
  idBrandMaster: number | null;

  // Page state
  userList: IUserListItem[];
  isEditing: string | null;
  modalOpen: "created" | "edited" | "deleted" | null;
  userToBeDeleted: IUserListItem | null;

  // Filters
  companyFilter: number | null;
  userFilter: string;

  // Setters
  setFullName: (value: string) => void;
  setEmail: (value: string) => void;
  setPhone: (value: string) => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setConfirmPassword: (value: string) => void;
  setPosition: (value: string) => void;
  setDepartment: (value: string) => void;
  setRole: (value: "admin" | "manager" | "member") => void;
  setHiringDate: (value: string) => void;
  setIsActive: (value: boolean) => void;
  setIdBrandMaster: (value: number | null) => void;

  setUserList: (value: IUserListItem[]) => void;
  setIsEditing: (value: string | null) => void;
  setModalOpen: (value: "created" | "edited" | "deleted" | null) => void;
  setUserToBeDeleted: (value: IUserListItem | null) => void;

  setCompanyFilter: (value: number | null) => void;
  setUserFilter: (value: string) => void;

  resetForm: () => void;
  resetAll: () => void;

  loadUserForEdit: (user: IUserListItem) => void;
}

const INIT_FORM_STATE = {
  fullName: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  confirmPassword: "",
  position: "",
  department: "",
  role: "member" as const,
  hiringDate: "",
  isActive: true,
  idBrandMaster: null as number | null,
};

const INIT_STATE = {
  ...INIT_FORM_STATE,
  userList: [] as IUserListItem[],
  isEditing: null as string | null,
  modalOpen: null as "created" | "edited" | "deleted" | null,
  userToBeDeleted: null as IUserListItem | null,
  companyFilter: null as number | null,
  userFilter: "",
};

export const useZColaboratorRegisterPage = create<IColaboratorRegisterPage>(
  (set) => ({
    ...INIT_STATE,

    setFullName: (value) => set({ fullName: value }),
    setEmail: (value) => set({ email: value }),
    setPhone: (value) => set({ phone: value }),
    setUsername: (value) => set({ username: value }),
    setPassword: (value) => set({ password: value }),
    setConfirmPassword: (value) => set({ confirmPassword: value }),
    setPosition: (value) => set({ position: value }),
    setDepartment: (value) => set({ department: value }),
    setRole: (value) => set({ role: value }),
    setHiringDate: (value) => set({ hiringDate: value }),
    setIsActive: (value) => set({ isActive: value }),
    setIdBrandMaster: (value) => set({ idBrandMaster: value }),

    setUserList: (value) => set({ userList: value }),
    setIsEditing: (value) => set({ isEditing: value }),
    setModalOpen: (value) => set({ modalOpen: value }),
    setUserToBeDeleted: (value) => set({ userToBeDeleted: value }),

    setCompanyFilter: (value) => set({ companyFilter: value }),
    setUserFilter: (value) => set({ userFilter: value }),

    resetForm: () => set({ ...INIT_FORM_STATE }),
    resetAll: () => set({ ...INIT_STATE }),

    loadUserForEdit: (user) =>
      set({
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        username: user.username || "",
        password: "",
        confirmPassword: "",
        position: user.position || "",
        department: user.department || "",
        role: user.role || "member",
        hiringDate: user.hiringDate || "",
        isActive: user.isActive ?? true,
        idBrandMaster: user.idBrandMaster,
        isEditing: user.idUser,
      }),
  })
);
