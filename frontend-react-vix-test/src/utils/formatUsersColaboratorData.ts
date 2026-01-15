import { Colaborator } from "../stores/useZColaboratorRegister";
import { IUserResponse } from "../types/userTypes";

export const formatUsersColaboratorData = (
  data: IUserResponse[],
): Colaborator[] => {
  return data.map((user) => ({
    idUser: user.idUser,
    name: user.username || "",
    username: user.username || "",
    email: user.email || "",
    permission: user.role,
    status: user.isActive ? "active" : "inactive",
    lastActivity: user.lastLoginDate || "",
    position: "",
    department: "",
    hiringDate: "",
    phone: "",
    idBrandMaster: user.idBrandMaster || undefined,
    profileImgUrl: user.profileImgUrl || "",
    companyName: user.brandMaster?.brandName || "",
  }));
};
