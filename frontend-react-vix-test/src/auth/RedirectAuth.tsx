import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useZUserProfile } from "../stores/useZUserProfile";
import { FullPage } from "../components/Skeletons/FullPage";

export const RedirectAuth = () => {
  const navigate = useNavigate();
  const { idUser, token } = useZUserProfile();

  useEffect(() => {
    if (idUser && token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [idUser, token, navigate]);

  return <FullPage />;
};
