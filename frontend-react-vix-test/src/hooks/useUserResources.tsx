import { useState } from "react";
import { TRole, useZUserProfile } from "../stores/useZUserProfile";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export interface IUserDB {
  idUser: string;
  idBrandMaster: number | null;
  username: string;
  email: string;
  profileImgUrl: null | string;
  role: "admin" | "manager" | "member";
  isActive: boolean;
  socketId: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
}

interface ICreateNewUser {
  username: string;
  email: string;
  role: TRole;
  password?: string;
  idBrandMaster?: number;
  isActive?: boolean;
}

export const useUserResources = () => {
  const { idUser, setUser, role, idBrand } = useZUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const updateUser = async (data: Partial<IUserDB>) => {
    setIsLoading(true);
    const response = await api.put<IUserDB>({
      url: `/user/${idUser}`,
      data,
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return null;
    }

    setUser({
      profileImgUrl: response.data.profileImgUrl,
      username: response.data.username,
      userEmail: response.data.email,
      idBrand: response.data.idBrandMaster,

      role: response.data.role,
    });

    return response.data;
  };

  const createUserByManager = async (data: ICreateNewUser) => {
    if (role !== "admin" && role !== "manager") return null;
    const idBrandMaster = idBrand;
    if (!idBrandMaster) {
      toast.error(t("generic.errorToSaveData"));
      return null;
    }

    setIsLoading(true);
    const response = await api.post({
      url: `/user/new-user`,
      data: {
        ...data,
        idBrandMaster,
      },
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return null;
    }

    return response.data;
  };

  return { isLoading, updateUser, createUserByManager };
};
