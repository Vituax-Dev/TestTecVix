export interface IUserLoginResponse {
  token: string;
  user: {
    idUser: string;       
    username: string;
    email: string;
    role: "admin" | "manager" | "member";
    isActive: boolean;    
    idBrandMaster: number | null;
    profileImgUrl: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    deletedAt: string | Date | null;
  };
}