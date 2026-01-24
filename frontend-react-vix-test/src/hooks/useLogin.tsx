import { useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useZUserProfile } from "../stores/useZUserProfile";
import { useNavigate } from "react-router-dom";
import { useZResetAllStates } from "../stores/useZResetAllStates";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsOpenModalUserNotActive, setLoginTime } = useZGlobalVar();
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
    try {
      setIsLoading(true);

      // Validação mínima dos campos
      if ((!username && !email) || !password) {
        toast.error("Preencha email/usuário e senha");
        return;
      }

      // Chamada da API
      const response = await api.post<{
        token: string;
        user: {
          idUser: string;
          username: string;
          email: string;
          role: "admin" | "manager" | "member";
          profileImgUrl: string | null;
          idBrandMaster: number | null;
        };
      }>({
        url: "/auth/login",
        data: {
          username: username || undefined,
          password,
          email: email || undefined,
        },
        tryRefetch: true,
      });

      

      
      if (response.error) {
        toast.error(response.message);
        return;
      }

      const { token, user } = response.data;

      
      if (!token) {
        toast.error("Token inválido");
        return;
      }

      
      localStorage.setItem("token", token);

      
      setUser({
        idUser: user.idUser,
        profileImgUrl: user.profileImgUrl,
        username: user.username,
        userEmail: user.email,
        idBrand: user.idBrandMaster,
        token: token,
        role: user.role,
      });

      // Marca o horário do login
      setLoginTime(new Date());

      // Redireciona para home (rota "/")
      navigate("/", { replace: true });
    } catch (err) {
      toast.error("Erro ao realizar login");
    } finally {
      setIsLoading(false);
    }
  };

  const goLogout = () => {
    // Limpa estados globais
    resetAllStates();

    // Remove token
    localStorage.removeItem("token");

    // Vai pro login
    navigate("/login", { replace: true });
  };

  return { goLogin, isLoading, goLogout };
};
