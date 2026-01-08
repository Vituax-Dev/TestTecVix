import { useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import { useZUserProfile } from "../stores/useZUserProfile";
import { IBrandMasterResponse } from "../types/BrandMasterTypes";
import { useBrandMasterInfos } from "./useBrandMasterInfos";

export const useLoadingApp = (notLoginPage: boolean = false) => {
  const [loading, setLoading] = useState(true);
  const { resetAll: resetAllUser, idUser } = useZUserProfile();
  const { setBrandInfos } = useBrandMasterInfos();
  const path = window.location.pathname;

  const fetchTheme = async () => {
    setLoading(true);
    const theme = await api.get<IBrandMasterResponse | null>({
      url: "/brand-master/self",
    });

    if (theme.error) {
      toast.error(theme.message);
      return setLoading(false);
    }

    if (!theme.data) {
      setLoading(false);
      if (notLoginPage) return;
      return;
    }
    await setBrandInfos(theme.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTheme();
  }, [path]);

  useEffect(() => {
    if (idUser) {
      resetAllUser();
    }
  }, []);

  return {
    loading,
  };
};
