import { Box, Button, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { InputLabelTooltip } from "../../components/Inputs/InputLabelTooltip";
import { DropDownLabelToolTip } from "../../components/Inputs/DropDownLabelToolTip";
import { TextRob16Font1S } from "../../components/Text1S";
import { useUserResources } from "../../hooks/useUserResources";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { useEffect, useState } from "react";
import { useZUserProfile } from "../../stores/useZUserProfile";

interface IColaboratorFormProps {
  onSuccess: () => void;
}

export const ColaboratorForm = ({ onSuccess }: IColaboratorFormProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { createUserByManager, isVituaxUser, isLoading } = useUserResources();
  const { listAllBrands } = useBrandMasterResources();
  const { idBrand } = useZUserProfile();
  const [companies, setCompanies] = useState<{ label: string; value: number | null }[]>([]);
  const [showError, setShowError] = useState(false);

  const {
    colaboratorName,
    setColaboratorName,
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
    permission,
    setPermission,
    status,
    setStatus,
    hiringDate,
    setHiringDate,
    idBrandMaster,
    setIdBrandMaster,
    selectedMSP,
    setSelectedMSP,
    resetInputs,
  } = useZColaboratorRegister();

  useEffect(() => {
    const fetchCompanies = async () => {
      if (isVituaxUser) {
        const response = await listAllBrands();
        const companyOptions = [
          { label: "Vituax", value: null },
          ...response.result.map((brand: { brandName: string; idBrandMaster: number }) => ({
            label: brand.brandName,
            value: brand.idBrandMaster,
          })),
        ];
        setCompanies(companyOptions);
      }
    };
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVituaxUser]);

  const permissionOptions = [
    { label: t("colaboratorRegister.admin"), value: "admin" },
    { label: t("colaboratorRegister.manager"), value: "manager" },
    { label: t("colaboratorRegister.member"), value: "member" },
  ];

  const statusOptions = [
    { label: t("colaboratorRegister.active"), value: "active" },
    { label: t("colaboratorRegister.inactive"), value: "inactive" },
  ];

  const validateForm = () => {
    if (!colaboratorName || !email || !username || !password || !permission) {
      setShowError(true);
      return false;
    }
    if (password !== confirmPassword) {
      setShowError(true);
      return false;
    }
    if (password.length < 8) {
      setShowError(true);
      return false;
    }
    setShowError(false);
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const result = await createUserByManager({
      username,
      email,
      password,
      fullName: colaboratorName,
      phone: phone || undefined,
      position: position || undefined,
      department: department || undefined,
      hiringDate: hiringDate || undefined,
      role: permission as "admin" | "manager" | "member",
      isActive: status === "active" || status === "",
      idBrandMaster: isVituaxUser ? idBrandMaster : idBrand,
    });

    if (result) {
      resetInputs();
      onSuccess();
    }
  };

  const handleClear = () => {
    resetInputs();
    setShowError(false);
  };

  const handleCompanyChange = (value: { label: string; value: unknown } | null) => {
    if (value) {
      setSelectedMSP(value.value !== null ? { idBrandMaster: value.value as number, brandName: value.label } : null);
      setIdBrandMaster(value.value as number | null);
    } else {
      setSelectedMSP(null);
      setIdBrandMaster(null);
    }
  };

  return (
    <Stack
      sx={{
        width: "100%",
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        padding: "24px",
        boxSizing: "border-box",
        gap: "24px",
      }}
    >
      {/* Section Title */}
      <TextRob16Font1S
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        {t("colaboratorRegister.subtitle")}
      </TextRob16Font1S>

      {/* Row 1: Full Name, Email, Phone */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          "@media (max-width: 900px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <InputLabelTooltip
          value={colaboratorName}
          onChange={setColaboratorName}
          label={
            <>
              {t("colaboratorRegister.completeName")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("colaboratorRegister.required")}
              </span>
            </>
          }
          placeholder={t("colaboratorRegister.completeNamePlaceholder")}
          sxContainer={{
            ...(showError && !colaboratorName && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
        <InputLabelTooltip
          value={email}
          onChange={setEmail}
          label={
            <>
              {t("colaboratorRegister.email")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("colaboratorRegister.required")}
              </span>
            </>
          }
          placeholder={t("colaboratorRegister.emailPlaceholder")}
          sxContainer={{
            ...(showError && !email && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
        <InputLabelTooltip
          value={phone}
          onChange={setPhone}
          label={t("colaboratorRegister.phone")}
          placeholder="(00) 0 0000-0000"
        />
      </Box>

      {/* Row 2: Username, Password, Confirm Password */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          "@media (max-width: 900px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <InputLabelTooltip
          value={username || ""}
          onChange={setUsername}
          label={
            <>
              {t("colaboratorRegister.username")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("colaboratorRegister.required")}
              </span>
            </>
          }
          placeholder="Username"
          sxContainer={{
            ...(showError && !username && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
        <InputLabelTooltip
          value={password || ""}
          onChange={setPassword}
          type="password"
          label={
            <>
              {t("colaboratorRegister.password")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("colaboratorRegister.required")}
              </span>
            </>
          }
          placeholder="Password"
          sxContainer={{
            ...(showError && (!password || password.length < 8) && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
        <InputLabelTooltip
          value={confirmPassword || ""}
          onChange={setConfirmPassword}
          type="password"
          label={t("colaboratorRegister.confirmPassword")}
          placeholder="Confirm Password"
          sxContainer={{
            ...(showError && password !== confirmPassword && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
      </Box>

      {/* Row 3: Position, Department, Permission */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          "@media (max-width: 900px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <InputLabelTooltip
          value={position}
          onChange={setPosition}
          label={
            <>
              {t("colaboratorRegister.position")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("colaboratorRegister.required")}
              </span>
            </>
          }
          placeholder={t("colaboratorRegister.positionPlaceholder")}
        />
        <InputLabelTooltip
          value={department}
          onChange={setDepartment}
          label={t("colaboratorRegister.department")}
          placeholder={t("colaboratorRegister.departmentPlaceholder")}
        />
        <DropDownLabelToolTip
          data={permissionOptions}
          value={
            permission
              ? permissionOptions.find((opt) => opt.value === permission) || null
              : null
          }
          onChange={(value) => setPermission(value?.value as string || "")}
          label={
            <>
              {t("colaboratorRegister.permission")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("colaboratorRegister.required")}
              </span>
            </>
          }
          placeholder=""
          sxContainer={{
            ...(showError && !permission && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
      </Box>

      {/* Row 4: Hiring Date, Status, Company Name */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px",
          "@media (max-width: 900px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <InputLabelTooltip
          value={hiringDate}
          onChange={setHiringDate}
          type="date"
          label={t("colaboratorRegister.hiringDate")}
          placeholder="DD/MM/AAAA"
        />
        <DropDownLabelToolTip
          data={statusOptions}
          value={
            status
              ? statusOptions.find((opt) => opt.value === status) || null
              : null
          }
          onChange={(value) => setStatus(value?.value as string || "")}
          label={
            <>
              {t("colaboratorRegister.status")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("colaboratorRegister.required")}
              </span>
            </>
          }
          placeholder=""
        />
        {isVituaxUser ? (
          <DropDownLabelToolTip
            data={companies}
            value={
              selectedMSP
                ? { label: selectedMSP.brandName, value: selectedMSP.idBrandMaster }
                : idBrandMaster === null
                ? { label: "Vituax", value: null }
                : null
            }
            onChange={handleCompanyChange}
            label={t("colaboratorRegister.companyName")}
            placeholder=""
          />
        ) : (
          <InputLabelTooltip
            value={selectedMSP?.brandName || ""}
            onChange={() => {}}
            disabled
            label={t("colaboratorRegister.companyName")}
            placeholder=""
          />
        )}
      </Box>

      {/* Buttons */}
      <Stack
        direction="row"
        gap="16px"
        sx={{
          marginTop: "8px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={isLoading}
          sx={{
            backgroundColor: theme[mode].btnDarkBlue,
            color: theme[mode].light,
            borderRadius: "24px",
            padding: "12px 48px",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              backgroundColor: theme[mode].primary,
            },
          }}
        >
          {t("colaboratorRegister.save")}
        </Button>
        <Button
          variant="outlined"
          onClick={handleClear}
          sx={{
            borderColor: theme[mode].gray,
            color: theme[mode].black,
            borderRadius: "24px",
            padding: "12px 48px",
            textTransform: "none",
            fontWeight: 500,
            "&:hover": {
              borderColor: theme[mode].black,
              backgroundColor: "transparent",
            },
          }}
        >
          {t("colaboratorRegister.clear")}
        </Button>
      </Stack>
    </Stack>
  );
};
