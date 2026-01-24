/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useZResetAllStates } from "../stores/useZResetAllStates";
import { FullPage } from "../components/Skeletons/FullPage";
import { useEffect, useState } from "react";
import { useZUserProfile } from "../stores/useZUserProfile";

interface IProps {
  children: React.ReactNode;
  onlyManagerOrAdmin?: boolean;
  onlyAdmin?: boolean;
  skeleton?: boolean;
}

export const PrivatePage = ({
  children,
  onlyAdmin = false,
  onlyManagerOrAdmin = false,
}: IProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { resetAllStates } = useZResetAllStates();
  const navigate = useNavigate();
  const { idUser, token, role } = useZUserProfile();

  useEffect(() => {
    // Se não tem token ou idUser, reseta e vai pro login
    if (!idUser || !token) {
      resetAllStates();
      navigate("/login");
      return;
    }

    // Verifica permissões
    if (onlyAdmin && role !== "admin") {
      navigate(-1);
      return;
    }

    if (onlyManagerOrAdmin && role !== "admin" && role !== "manager") {
      navigate(-1);
      return;
    }

    // Tudo OK, pode mostrar a página
    setIsChecking(false);
  }, [idUser, token, role, onlyAdmin, onlyManagerOrAdmin, navigate]);
  // IMPORTANTE: resetAllStates NÃO está no array de dependências para evitar loop

  if (!idUser || !token) {
    return <FullPage />;
  }

  if (isChecking) {
    return <FullPage />;
  }

  return <>{children}</>;
};