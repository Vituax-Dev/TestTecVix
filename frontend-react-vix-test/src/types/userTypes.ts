export enum ERole {
  ADMIN = "admin",
  MANAGER = "manager",
  MEMBER = "member",
}

export interface IUserResponse {
  idUser: string;
  idBrandMaster: 1;
  createdAt: string | Date;
  deletedAt: string | Date | null;
  email: string | null;
  isActive: boolean;
  lastLoginDate: string | Date;
  profileImgUrl: string | null;
  role: ERole;
  socketId: null | string;
  updatedAt: string | Date;
  username: string;
}

export interface IPincodeInfos {
  expiredPinCodeSeconds: number;
  pinCode: string;
  socketId: string | null;
  updatedAt: Date | string;
}

export interface IUserBasicInfo {
  fullName?: string | null;
  name?: string | null;
  username?: string | null;
  idUser?: string | null;
  idBrandMaster?: number | null;
}
