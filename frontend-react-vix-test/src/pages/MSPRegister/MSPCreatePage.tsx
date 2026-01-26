import { useNavigate } from "react-router-dom";
import { MSPRegisterForm } from "./components/MSPRegisterForm";
import { usePermissions } from "../../hooks/usePermissions";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const MSPCreatePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAdmin } = usePermissions();

  useEffect(() => {
    if (!isAdmin) {
      toast.error(t("errors.noPermission"));
      navigate("/dashboard");
    }
  }, [isAdmin, navigate, t]);

  const handleSuccess = () => {
    toast.success(t("mspRegister.createSuccess"));
  };

  const handleClose = () => {
    navigate("/msp-register");
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <MSPRegisterForm 
      onSuccess={handleSuccess}
      onClose={handleClose}
    />
  );
};