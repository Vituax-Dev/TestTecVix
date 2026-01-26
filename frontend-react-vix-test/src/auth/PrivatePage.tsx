import { useNavigate } from "react-router-dom";
import { useZResetAllStates } from "../stores/useZResetAllStates";
import { FullPage } from "../components/Skeletons/FullPage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useZUserProfile } from "../stores/useZUserProfile";
import { ERole } from "../types/userTypes";

interface IAuthContext {
  isAdmin: boolean;
  isManagerOrAdmin: boolean;
}

const AuthContext = createContext<IAuthContext>({
  isAdmin: false,
  isManagerOrAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

interface IProps {
  children: React.ReactNode;
  onlyManagerOrAdmin?: boolean;
}

export const PrivatePage = ({ children, onlyManagerOrAdmin }: IProps) => {
  const [isChecking, setIsChecking] = useState(true);
  const { resetAllStates } = useZResetAllStates();
  const { idUser, role } = useZUserProfile();
  const navigate = useNavigate();

  const authValue = useMemo(() => ({
    isAdmin: role === ERole.ADMIN,
    isManagerOrAdmin: role === ERole.ADMIN || role === ERole.MANAGER,
  }), [role]);

  useEffect(() => {
    if (!idUser) {
      resetAllStates();
      navigate("/login");
    } else if (onlyManagerOrAdmin && role !== ERole.ADMIN && role !== ERole.MANAGER) {
      navigate("/");
    } else {
      setIsChecking(false);
    }
  }, [idUser, navigate, resetAllStates, onlyManagerOrAdmin, role]);

  if (!idUser || isChecking) return <FullPage />;

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};
