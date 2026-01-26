import { Stack, Grid2 as Grid } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { useZColaboratorRegisterPage } from "../../stores/useZColaboratorRegisterPage";
import { useUserResources } from "../../hooks/useUserResources";
import { useZUserProfile } from "../../stores/useZUserProfile";
import { InputLabelAndFeedback } from "../../components/Inputs/InputLabelAndFeedback";
import { DropDrownLabel } from "../../components/Inputs/DropDrownLabel";
import { Btn } from "../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../components/Text1S";
import { TextRob18Font2M } from "../../components/Text2M";
import { maskPhone } from "../../utils/maskPhone";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { INewMSPResponse } from "../../hooks/useBrandMasterResources";
import { useEffect } from "react";
import { ERole } from "../../types/userTypes";

interface ColaboratorFormProps {
  onSuccess: () => void;
}

export const ColaboratorForm = ({ onSuccess }: ColaboratorFormProps) => {
  const { t } = useTranslation();
  const { mode, theme } = useZTheme();
  const { idBrand } = useZUserProfile();
  const { createUser, updateUserById, isLoading } = useUserResources();
  const { listAllBrands } = useBrandMasterResources();

  const {
    fullName,
    setFullName,
    email,
    setEmail,
    phone,
    setPhone,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    position,
    setPosition,
    department,
    setDepartment,
    role,
    setRole,
    hiringDate,
    setHiringDate,
    isActive,
    setIsActive,
    idBrandMaster,
    setIdBrandMaster,
    isEditing,
    resetForm,
    setIsEditing,
    setModalOpen,
  } = useZColaboratorRegisterPage();

  const [companies, setCompanies] = useState<INewMSPResponse[]>([]);
  const [fullNameError, setFullNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [positionError, setPositionError] = useState<string | null>(null);
  const [companyError, setCompanyError] = useState<string | null>(null);

  // Usuário vituax (idBrand === null) pode ver todas as empresas
  const isVituaxUser = idBrand === null;

  useEffect(() => {
    const fetchCompanies = async () => {
      if (isVituaxUser) {
        const response = await listAllBrands();
        if (response?.result) {
          setCompanies(response.result);
        }
      }
    };
    fetchCompanies();
  }, [isVituaxUser, listAllBrands]);

  const validateForm = (): boolean => {
    let isValid = true;

    if (!fullName.trim()) {
      setFullNameError(t("colaboratorRegister.fillFields"));
      isValid = false;
    } else {
      setFullNameError(null);
    }

    if (!email.trim()) {
      setEmailError(t("colaboratorRegister.fillFields"));
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(t("colaboratorRegister.emailAlertMessage"));
      isValid = false;
    } else {
      setEmailError(null);
    }

    if (!username.trim()) {
      setUsernameError(t("colaboratorRegister.fillFields"));
      isValid = false;
    } else {
      setUsernameError(null);
    }

    if (!isEditing) {
      if (!password.trim()) {
        setPasswordError(t("colaboratorRegister.fillFields"));
        isValid = false;
      } else {
        setPasswordError(null);
      }

      if (password !== confirmPassword) {
        setConfirmPasswordError(t("colaboratorRegister.dontMatch"));
        isValid = false;
      } else {
        setConfirmPasswordError(null);
      }
    } else {
      if (password && password !== confirmPassword) {
        setConfirmPasswordError(t("colaboratorRegister.dontMatch"));
        isValid = false;
      } else {
        setConfirmPasswordError(null);
      }
    }

    if (!position.trim()) {
      setPositionError(t("colaboratorRegister.fillFields"));
      isValid = false;
    } else {
      setPositionError(null);
    }

    if (isVituaxUser && !idBrandMaster) {
      setCompanyError(t("colaboratorRegister.fillFields"));
      isValid = false;
    } else {
      setCompanyError(null);
    }

    return isValid;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const userData = {
      username,
      email,
      fullName,
      phone: phone || undefined,
      role: role as ERole,
      isActive,
      idBrandMaster: idBrandMaster ?? idBrand ?? undefined,
    };

    if (isEditing) {
      const result = await updateUserById(isEditing, {
        ...userData,
        password: password || undefined,
      });
      if (result) {
        setModalOpen("edited");
        resetForm();
        setIsEditing(null);
        onSuccess();
      }
    } else {
      const result = await createUser({
        ...userData,
        password,
      });
      if (result) {
        setModalOpen("created");
        resetForm();
        onSuccess();
      }
    }
  };

  const handleClear = () => {
    resetForm();
    setIsEditing(null);
    setFullNameError(null);
    setEmailError(null);
    setUsernameError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);
    setPositionError(null);
    setCompanyError(null);
  };

  const roleOptions = [
    { label: t("colaboratorRegister.admin"), value: "admin" },
    { label: t("colaboratorRegister.manager"), value: "manager" },
    { label: t("colaboratorRegister.member"), value: "member" },
  ];

  const statusOptions = [
    { label: t("colaboratorRegister.active"), value: true },
    { label: t("colaboratorRegister.inactive"), value: false },
  ];

  const companyOptions = companies.map((c) => ({
    label: c.brandName || "",
    value: c.idBrandMaster,
  }));

  return (
    <Stack sx={{ gap: "24px" }}>
      <TextRob18Font2M sx={{ color: theme[mode].primary }}>
        {t("colaboratorRegister.subtitle")}
      </TextRob18Font2M>

      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={fullName}
            onChange={setFullName}
            label={
              <>
                {t("colaboratorRegister.completeName")}{" "}
                <span style={{ color: theme[mode].tertiary }}>
                  {t("colaboratorRegister.required")}
                </span>
              </>
            }
            placeholder={t("colaboratorRegister.completeNamePlaceholder")}
            errorMessage={fullNameError}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={email}
            onChange={setEmail}
            label={
              <>
                {t("colaboratorRegister.email")}{" "}
                <span style={{ color: theme[mode].tertiary }}>
                  {t("colaboratorRegister.required")}
                </span>
              </>
            }
            placeholder={t("colaboratorRegister.emailPlaceholder")}
            type="email"
            errorMessage={emailError}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={phone}
            onChange={(val) => setPhone(maskPhone(val))}
            label={t("colaboratorRegister.phone")}
            placeholder="(00) 0 0000-0000"
          />
        </Grid>

        {/* Row 2 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={username}
            onChange={setUsername}
            label={
              <>
                {t("colaboratorRegister.username")}{" "}
                <span style={{ color: theme[mode].tertiary }}>
                  {t("colaboratorRegister.required")}
                </span>
              </>
            }
            placeholder={t("colaboratorRegister.username")}
            errorMessage={usernameError}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={password}
            onChange={setPassword}
            label={
              <>
                {t("colaboratorRegister.password")}{" "}
                {!isEditing && (
                  <span style={{ color: theme[mode].tertiary }}>
                    {t("colaboratorRegister.required")}
                  </span>
                )}
              </>
            }
            placeholder={t("colaboratorRegister.password")}
            type="password"
            errorMessage={passwordError}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={confirmPassword}
            onChange={setConfirmPassword}
            label={t("colaboratorRegister.confirmPassword")}
            placeholder={t("colaboratorRegister.confirmPassword")}
            type="password"
            errorMessage={confirmPasswordError}
          />
        </Grid>

        {/* Row 3 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={position}
            onChange={setPosition}
            label={
              <>
                {t("colaboratorRegister.position")}{" "}
                <span style={{ color: theme[mode].tertiary }}>
                  {t("colaboratorRegister.required")}
                </span>
              </>
            }
            placeholder={t("colaboratorRegister.positionPlaceholder")}
            errorMessage={positionError}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={department}
            onChange={setDepartment}
            label={t("colaboratorRegister.department")}
            placeholder={t("colaboratorRegister.departmentPlaceholder")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DropDrownLabel
            data={roleOptions}
            value={roleOptions.find((o) => o.value === role) || null}
            onChange={(val) => setRole((val?.value as "admin" | "manager" | "member") || "member")}
            label={
              <>
                {t("colaboratorRegister.permission")}{" "}
                <span style={{ color: theme[mode].tertiary }}>
                  {t("colaboratorRegister.required")}
                </span>
              </>
            }
          />
        </Grid>

        {/* Row 4 */}
        <Grid size={{ xs: 12, md: 4 }}>
          <InputLabelAndFeedback
            value={hiringDate}
            onChange={setHiringDate}
            label={t("colaboratorRegister.hiringDate")}
            type="date"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <DropDrownLabel
            data={statusOptions}
            value={statusOptions.find((o) => o.value === isActive) || null}
            onChange={(val) => setIsActive(val?.value as boolean ?? true)}
            label={
              <>
                {t("colaboratorRegister.status")}{" "}
                <span style={{ color: theme[mode].tertiary }}>
                  {t("colaboratorRegister.required")}
                </span>
              </>
            }
          />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          {isVituaxUser ? (
            <DropDrownLabel
              data={companyOptions}
              value={companyOptions.find((o) => o.value === idBrandMaster) || null}
              onChange={(val) => setIdBrandMaster(val?.value as number | null)}
              label={t("colaboratorRegister.companyName")}
              errorMessage={companyError}
            />
          ) : (
            <InputLabelAndFeedback
              value={companies.find((c) => c.idBrandMaster === idBrand)?.brandName || ""}
              onChange={() => {}}
              label={t("colaboratorRegister.companyName")}
              disabled
            />
          )}
        </Grid>
      </Grid>

      {/* Buttons */}
      <Stack sx={{ flexDirection: "row", gap: "16px" }}>
        <Btn
          onClick={handleSave}
          disabled={isLoading}
          sx={{
            background: theme[mode].blue,
            color: "#fff",
            borderRadius: "24px",
            padding: "12px 48px",
            "&:hover": {
              background: theme[mode].blueDark,
            },
          }}
        >
          <TextRob16Font1S>{t("colaboratorRegister.save")}</TextRob16Font1S>
        </Btn>
        <Btn
          onClick={handleClear}
          sx={{
            background: theme[mode].grayLight,
            color: theme[mode].primary,
            borderRadius: "24px",
            padding: "12px 48px",
            "&:hover": {
              background: theme[mode].gray,
            },
          }}
        >
          <TextRob16Font1S>{t("colaboratorRegister.clear")}</TextRob16Font1S>
        </Btn>
      </Stack>
    </Stack>
  );
};
