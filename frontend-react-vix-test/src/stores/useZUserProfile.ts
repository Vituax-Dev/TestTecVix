import { create } from "zustand";
import { middlewareLocalStorage } from "./middlewareLocalStorage";

export type TRole = "admin" | "manager" | "member";

export interface IUserProfile {
  idUser: string | null;
  profileImgUrl: string | null;
  objectName?: string;
  profileImgFile?: File | null; // Arquivo para upload após confirm
  profileImgPreview?: string; // Preview local (blob URL)
  removeImage?: boolean; // Flag para remover imagem
  username: string | null;
  isActive?: boolean;
  lastLoginDate?: string | Date;
  userEmail: string | null;
  token: string | null;
  idBrand: number | null;
  role: TRole | null;
}
const INIT_STATE: IUserProfile = {
  idUser: null,
  profileImgUrl: null,
  objectName: "",
  profileImgFile: null,
  profileImgPreview: "",
  removeImage: false,
  username: null,
  userEmail: null,
  token: null,
  idBrand: null,
  lastLoginDate: "",
  role: null,
};

interface IUserProfileState extends IUserProfile {
  setUser: (user: Partial<IUserProfile>) => void;
  setObjectName: (objectName: string) => void;
  setProfileImgFile: (file: File | null) => void;
  setProfileImgPreview: (preview: string) => void;
  setRemoveImage: (remove: boolean) => void;
  resetAll: () => void;
}
const middle = middlewareLocalStorage<IUserProfileState>("userProfile");

export const useZUserProfile = create<IUserProfileState>()(
  middle((set) => ({
    ...INIT_STATE,
    setUser: (user) => set((state) => ({ ...state, ...user })),
    setObjectName: (objectName) => set((state) => ({ ...state, objectName })),
    setProfileImgFile: (profileImgFile) => set((state) => ({ ...state, profileImgFile })),
    setProfileImgPreview: (profileImgPreview) => set((state) => ({ ...state, profileImgPreview })),
    setRemoveImage: (removeImage) => set((state) => ({ ...state, removeImage })),
    resetAll: () => set((state) => ({ ...state, ...INIT_STATE })),
  })),
);
