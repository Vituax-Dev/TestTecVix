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

  const { idUser, role, token } = useZUserProfile();

  useEffect(() => {
    if (!idUser || !token) {
      if (idUser !== null || token !== null) {
        resetAllStates();
      }
      navigate("/login");
      return;
    }

    setIsChecking(false);
  }, [
    idUser,
    token,
    role,
    onlyAdmin,
    onlyManagerOrAdmin,
    navigate,
    resetAllStates,
  ]);

  if (isChecking || !idUser) {
    return <FullPage />;
  }

  return <>{children}</>;
};
