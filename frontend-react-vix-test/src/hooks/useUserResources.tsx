import { useState } from "react";
import { TRole, useZUserProfile } from "../stores/useZUserProfile";
import { useAuth } from "./useAuth";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Colaborator } from "../stores/useZColaboratorRegister";

export interface IUserDB {
  idUser: string;
  idBrandMaster: number | null;
  username: string;
  email: string;
  phone?: string;
  fullName?: string;
  position?: string;
  department?: string;
  hiringDate?: string | Date | null;
  profileImgUrl: null | string;
  role: "admin" | "manager" | "member";
  isActive: boolean;
  socketId: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
  lastLoginDate?: string | Date | null;
  brandMaster?: {
    idBrandMaster: number;
    brandName: string;
  } | null;
}

interface ICreateNewUser {
  username: string;
  email: string;
  role: TRole;
  password?: string;
  idBrandMaster?: number | null;
  isActive?: boolean;
  fullName?: string;
  phone?: string;
  position?: string;
  department?: string;
  hiringDate?: string;
}

interface IListUsersResponse {
  data: IUserDB[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IListUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  idBrandMaster?: number;
}

export const useUserResources = () => {
  const { idUser, setUser, role, idBrand } = useZUserProfile();
  const { getAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const isVituaxUser = idBrand === null;

  const updateUser = async (data: Partial<IUserDB>) => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.put<IUserDB>({
      url: `/users/${idUser}`,
      data,
      auth,
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

    // Vituax users can create Vituax users or MSP users
    // MSP users can only create users in their own company
    const finalIdBrandMaster = isVituaxUser
      ? data.idBrandMaster // Vituax can choose any company or null
      : idBrand; // MSP users forced to their own company

    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.post({
      url: `/users/new-user`,
      auth,
      data: {
        ...data,
        idBrandMaster: finalIdBrandMaster,
      },
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return null;
    }

    toast.success(t("colaboratorRegister.userCreated"));
    return response.data;
  };

  const listUsers = async (
    params: IListUsersParams = {}
  ): Promise<{ users: Colaborator[]; totalPages: number } | null> => {
    if (role !== "admin" && role !== "manager") return null;

    const auth = await getAuth();
    setIsLoading(true);

    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", String(params.page));
    if (params.limit) queryParams.append("limit", String(params.limit));
    if (params.search) queryParams.append("search", params.search);
    if (params.idBrandMaster !== undefined)
      queryParams.append("idBrandMaster", String(params.idBrandMaster));

    const response = await api.get<IListUsersResponse>({
      url: `/users?${queryParams.toString()}`,
      auth,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(response.message);
      return null;
    }

    const users: Colaborator[] = response.data.data.map((user) => ({
      idUser: user.idUser,
      name: user.fullName || user.username,
      fullName: user.fullName || undefined,
      username: user.username,
      email: user.email,
      phone: user.phone || undefined,
      position: user.position || undefined,
      department: user.department || undefined,
      permission: user.role,
      hiringDate: user.hiringDate || null,
      status: user.isActive ? "active" : "inactive",
      lastActivity: user.lastLoginDate || null,
      profileImgUrl: user.profileImgUrl,
      idBrandMaster: user.idBrandMaster,
      brandName: user.brandMaster?.brandName || "Vituax",
    }));

    return { users, totalPages: response.data.totalPages };
  };

  // Map backend error messages to translation keys
  const translateErrorMessage = (message: string): string => {
    const errorMap: Record<string, string> = {
      "Cannot delete the last admin of this company": t("colaboratorRegister.cannotDeleteLastAdmin"),
      "Cannot demote the last admin of this company": t("colaboratorRegister.cannotDemoteLastAdmin"),
      "Cannot change user's company after registration": t("colaboratorRegister.cannotChangeUserCompany"),
      "Email already exists": t("colaboratorRegister.emailAlreadyExists"),
      "User not found": t("generic.notFound"),
    };
    return errorMap[message] || message;
  };

  const deleteUser = async (userId: string): Promise<boolean> => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.delete({
      url: `/users/${userId}`,
      auth,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(translateErrorMessage(response.message));
      return false;
    }

    toast.success(t("generic.deleted"));
    return true;
  };

  const updateUserById = async (userId: string, data: Partial<IUserDB>) => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.put<IUserDB>({
      url: `/users/${userId}`,
      data,
      auth,
    });
    setIsLoading(false);

    if (response.error) {
      toast.error(translateErrorMessage(response.message));
      return null;
    }

    toast.success(t("generic.saved"));
    return response.data;
  };

  return {
    isLoading,
    isVituaxUser,
    updateUser,
    createUserByManager,
    listUsers,
    deleteUser,
    updateUserById,
  };
};
