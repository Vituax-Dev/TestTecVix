import { useState, useCallback } from "react";
import { useZUserProfile } from "../stores/useZUserProfile";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ERole } from "../types/userTypes";
import { IListAll } from "../types/ListAllTypes";

export interface IUserDB {
  idUser: string;
  idBrandMaster: number | null;
  username: string;
  email: string;
  fullName: string | null;
  phone: string | null;
  profileImgUrl: null | string;
  position: string | null;
  department: string | null;
  role: ERole;
  isActive: boolean;
  socketId: string | null;
  lastLoginDate: string | Date | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
  brandMaster?: {
    brandName: string | null;
    brandLogo: string | null;
  } | null;
}

interface ICreateNewUser {
  username: string;
  email: string;
  role: ERole;
  password?: string;
  fullName?: string;
  phone?: string;
  position?: string;
  department?: string;
  idBrandMaster?: number;
  isActive?: boolean;
}

interface IUpdateUser {
  username?: string;
  email?: string;
  role?: ERole;
  password?: string;
  fullName?: string;
  phone?: string;
  position?: string;
  department?: string;
  isActive?: boolean;
}

interface IListUsersFilters {
  search?: string;
  idBrandMaster?: number | null;
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

  const updateUserById = async (userId: string, data: IUpdateUser) => {
    if (role !== "admin" && role !== "manager") return null;
    setIsLoading(true);
    const response = await api.put<IUserDB>({
      url: `/user/${userId}`,
      data,
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return null;
    }
    return response.data;
  };

  const listAllUsers = useCallback(async (filters?: IListUsersFilters) => {
    setIsLoading(true);

    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    if (filters?.idBrandMaster !== undefined && filters?.idBrandMaster !== null) {
      params.append("idBrandMaster", filters.idBrandMaster.toString());
    }
    if (filters?.isActive !== undefined) {
      params.append("isActive", filters.isActive.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `/user?${queryString}` : "/user";

    const response = await api.get<IListAll<IUserDB>>({
      url,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return { totalCount: 0, result: [] };
    }
    return response.data;
  }, []);

  const createUserByManager = async (data: ICreateNewUser) => {
    if (role !== "admin" && role !== "manager") return null;
    const idBrandMaster = data.idBrandMaster ?? idBrand;
    if (!idBrandMaster) {
      toast.error(t("generic.errorToSaveData"));
      return null;
    }

    setIsLoading(true);
    const response = await api.post<IUserDB>({
      url: `/user`,
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

  const deleteUserById = async (userId: string) => {
    if (role !== "admin" && role !== "manager") return null;
    setIsLoading(true);
    const response = await api.delete({
      url: `/user/${userId}`,
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return null;
    }
    return true;
  };

  const updateMe = async (data: {
    username?: string;
    email?: string;
    fullName?: string | null;
    phone?: string | null;
    password?: string;
    profileImgUrl?: string | null;
  }) => {
    setIsLoading(true);
    const response = await api.put<IUserDB>({
      url: `/user/me`,
      data,
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return null;
    }

    // Atualiza o estado do usuário logado
    setUser({
      profileImgUrl: response.data.profileImgUrl,
      username: response.data.username,
      userEmail: response.data.email,
      idBrand: response.data.idBrandMaster,
      role: response.data.role,
    });

    return response.data;
  };

  const getMe = async () => {
    setIsLoading(true);
    const response = await api.get<IUserDB>({
      url: `/user/me`,
    });
    setIsLoading(false);
    if (response.error) {
      return null;
    }
    return response.data;
  };

  return {
    isLoading,
    updateUser,
    updateUserById,
    updateMe,
    getMe,
    listAllUsers,
    createUserByManager,
    deleteUserById,
  };
};
