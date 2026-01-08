import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useZUserProfile } from "../stores/useZUserProfile";
import { useNavigate } from "react-router-dom";
import { useZResetAllStates } from "../stores/useZResetAllStates";

interface IUserLoginResponse {
  token: string | null;
  user: {
    createdAt: string | Date;
    deletedAt: string | Date | null;
    email: string;
    idBrandMaster: number | null;
    idCompany: number | null;
    idUser: number;
    isActive: boolean;
    profileImgUrl: null | string;
    role: "admin" | "manager" | "member";
    updatedAt: string | Date;
    username: string;
    userPhoneNumber: string | null;
    fullName?: string | null;
  };
  pinCodeSended?: boolean;
  pinCode?: string | null;
}

interface IUserVituaxLoginResponse {
  token: string | null;
  user: {
    createdAt: string | Date;
    deletedAt: string | Date | null;
    email: string;
    idUserVituax: number;
    isActive: boolean;
    profileImgUrl: null | string;
    role: "admin" | "manager" | "member";
    updatedAt: string | Date;
    username: string;
    socketId: string;
    lastLoginDate: string | Date | null;
    userPhoneNumber: string | null;
    fullName?: string | null;
  };
  pinCodeSended?: boolean;
  pinCode?: string | null;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpenModalUserNotActive, setLoginTime, setTempPinCodeExpress } =
    useZGlobalVar();
  const { setUser } = useZUserProfile();
  const { resetAllStates } = useZResetAllStates();
  const navigate = useNavigate();

  const goLogin = async ({
    username,
    password,
    email,
  }: {
    username: string;
    password: string;
    email: string;
  }) => {
    setIsLoading(true);
    if ((!username && !email) || !password) {
      setIsLoading(false);
      return;
    }

    const response = await api.post<IUserLoginResponse>({
      url: "/user/login",
      data: {
        username: username || undefined,
        password,
        email: email || undefined,
      },
      tryRefetch: true,
    });

    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return;
    }
    if (!response.data.user?.isActive) {
      setIsOpenModalUserNotActive(true);
      return;
    }

    setUser({
      idUser: response.data.user.idUser,
      profileImgUrl: response.data.user.profileImgUrl,
      username: response.data.user.username,
      userEmail: response.data.user.email,
      idBrand: response.data.user.idBrandMaster,
      token: response.data.token,
      role: response.data.user.role,
      userPhoneNumber: response.data.user.userPhoneNumber,
    });
    setLoginTime(new Date());
  };

  // login vituax
  const goLoginVituax = async ({
    username,
    password,
    email,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    if ((!username && !email) || !password) {
      setIsLoading(false);
      return false;
    }

    const response = await api.post<IUserVituaxLoginResponse>({
      url: "/user-vituax/login",
      data: {
        username: username || undefined,
        email: email || undefined,
        password,
      },
      tryRefetch: true,
    });

    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return false;
    }
    if (!response.data.user?.isActive) {
      setIsOpenModalUserNotActive(true);
      return false;
    }
    setUser({
      idUser: response.data.user.idUserVituax,
      profileImgUrl: response.data.user.profileImgUrl,
      username: response.data.user.username,
      userEmail: response.data.user.email,
      idBrand: null,
      // token: response.data.token,
      role: response.data.user.role,
      userPhoneNumber: response.data.user.userPhoneNumber,
    });

    setLoginTime(new Date());
    if (!response.data.pinCodeSended && response.data.pinCode)
      setTempPinCodeExpress(response.data.pinCode);

    return navigate("/verify-pincode");
  };

  const goLogout = () => {
    resetAllStates();
    return navigate("/login");
  };

  return { goLogin, isLoading, goLogout, goLoginVituax };
};
