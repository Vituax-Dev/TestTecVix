import { Box, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { SimpleInput } from "../../components/Inputs/SimpleInput";
import { DropDown } from "../../components/Inputs/DropDown";
import { FullFilledButton } from "../../components/Buttons/FullFilledButton";
import { UnfilledButton } from "../../components/Buttons/UnfilledButton";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { useUserResources } from "../../hooks/useUserResources";
import { toast } from "react-toastify";
import { maskPhone } from "../../utils/maskPhone";
import { useBrandMasterInfos } from "../../hooks/useBrandMasterInfos";
import { useEffect } from "react";
import { validateEmail } from "../../utils/validateEmail";
import { validateDate } from "../../utils/validateDate";
import { maskDate } from "../../utils/maskDate";

interface Props {
  onUserCreated?: () => void;
}

export const ColaboratorForm = ({ onUserCreated }: Props) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    colaboratorName,
    email,
    phone,
    position,
    department,
    permission,
    hiringDate,
    status,
    username,
    password,
    confirmPassword,
    idBrandMaster,
    setColaboratorName,
    setEmail,
    setPhone,
    setPosition,
    setDepartment,
    setPermission,
    setHiringDate,
    setStatus,
    setUsername,
    setPassword,
    setConfirmPassword,
    setIdBrandMaster,
    resetInputs,
    selectedMSP,
    setSelectedMSP,
  } = useZColaboratorRegister();

  const { createUserByManager, isLoading } = useUserResources();
  const { brandMasterList, fetchBrandMasterList } = useBrandMasterInfos();

  const inputBgColor = mode === "dark" ? "#2C2F3E" : "#F5F5F5";

  useEffect(() => {
    fetchBrandMasterList();
  }, []);

  const handleSave = async () => {
    console.log("handleSave called");
    console.log("Form values:", { colaboratorName, email, username, password, confirmPassword, position, permission, status });
    
    if (
      !colaboratorName ||
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      !position ||
      !permission ||
      !status
    ) {
      console.log("Validation failed: missing fields");
      toast.error(t("colaboratorRegister.alertMessage"));
      return;
    }

    if (!validateEmail(email)) {
      console.log("Validation failed: invalid email");
      toast.error(t("colaboratorRegister.emailAlertMessage"));
      return;
    }

    if (password !== confirmPassword) {
      console.log("Validation failed: passwords don't match");
      toast.error(t("colaboratorRegister.dontMatch"));
      return;
    }

    if (hiringDate && hiringDate.length > 0 && !validateDate(hiringDate)) {
      console.log("Validation failed: invalid date");
      toast.error("Data de contratação inválida");
      return;
    }

    console.log("All validations passed, calling API...");
    
    try {
      const result = await createUserByManager({
        username,
        email,
        role: permission as "admin" | "manager" | "member",
        password,
        fullName: colaboratorName,
        userPhoneNumber: phone || undefined,
        idBrandMaster: idBrandMaster || undefined,
        isActive: status === "active",
      });

      console.log("API result:", result);

      if (result) {
        toast.success(t("colaboratorRegister.userCreated"));
        resetInputs();
        if (onUserCreated) onUserCreated();
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleClear = () => {
    resetInputs();
    setSelectedMSP(null);
  };

  const permissionOptions = [
    { label: t("colaboratorRegister.admin"), value: "admin" },
    { label: t("colaboratorRegister.manager"), value: "manager" },
    { label: t("colaboratorRegister.member"), value: "member" },
  ];

  const statusOptions = [
    { label: t("colaboratorRegister.active"), value: "active" },
    { label: t("colaboratorRegister.inactive"), value: "inactive" },
  ];

  const companyOptions = brandMasterList.map((brand) => ({
    label: brand.brandName,
    value: brand.idBrandMaster,
  }));

  return (
    <Stack
      sx={{
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        padding: "32px",
        gap: "24px",
      }}
    >
      <TextRob16Font1S
        sx={{
          color: theme[mode].primary,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        {t("colaboratorRegister.subtitle")}
      </TextRob16Font1S>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          "@media (max-width: 1200px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.completeName")}{" "}
            <span style={{ color: "#FF4444" }}>
              {t("colaboratorRegister.required")}
            </span>
          </TextRob16Font1S>
          <SimpleInput
            value={colaboratorName}
            onChange={setColaboratorName}
            placeholder={t("colaboratorRegister.completeNamePlaceholder")}
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
            showIcon={false}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.email")}{" "}
            <span style={{ color: "#FF4444" }}>
              {t("colaboratorRegister.required")}
            </span>
          </TextRob16Font1S>
          <SimpleInput
            value={email}
            onChange={setEmail}
            placeholder={t("colaboratorRegister.emailPlaceholder")}
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
            showIcon={false}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.phone")}
          </TextRob16Font1S>
          <SimpleInput
            value={phone}
            onChange={(value) => setPhone(maskPhone(value))}
            placeholder="(00) 0 0000-0000"
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
            showIcon={false}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.username")}{" "}
            <span style={{ color: "#FF4444" }}>
              {t("colaboratorRegister.required")}
            </span>
          </TextRob16Font1S>
          <SimpleInput
            value={username}
            onChange={setUsername}
            placeholder="Username"
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
            showIcon={false}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.password")}{" "}
            <span style={{ color: "#FF4444" }}>
              {t("colaboratorRegister.required")}
            </span>
          </TextRob16Font1S>
          <SimpleInput
            value={password}
            onChange={setPassword}
            placeholder="Password"
            type="password"
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.confirmPassword")}
          </TextRob16Font1S>
          <SimpleInput
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Confirm Password"
            type="password"
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.position")}{" "}
            <span style={{ color: "#FF4444" }}>
              {t("colaboratorRegister.required")}
            </span>
          </TextRob16Font1S>
          <SimpleInput
            value={position}
            onChange={setPosition}
            placeholder={t("colaboratorRegister.positionPlaceholder")}
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
            showIcon={false}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.department")}
          </TextRob16Font1S>
          <SimpleInput
            value={department}
            onChange={setDepartment}
            placeholder={t("colaboratorRegister.departmentPlaceholder")}
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
            showIcon={false}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.permission")}{" "}
            <span style={{ color: "#FF4444" }}>
              {t("colaboratorRegister.required")}
            </span>
          </TextRob16Font1S>
          <DropDown
            data={permissionOptions}
            value={
              permissionOptions.find((opt) => opt.value === permission) || null
            }
            onChange={(value) => setPermission(value?.value as string)}
            placeholder={t("colaboratorRegister.permission")}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "48px",
                backgroundColor: inputBgColor,
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.hiringDate")}
          </TextRob16Font1S>
          <SimpleInput
            value={hiringDate}
            onChange={(value) => setHiringDate(maskDate(value))}
            placeholder="dd/mm/aaaa"
            inputSx={{
              height: "48px",
              borderRadius: "12px",
              backgroundColor: inputBgColor,
            }}
            sx={{
              "& .MuiInputBase-input::placeholder": {
                color: "#8B8D98",
                opacity: 1,
              },
            }}
            showIcon={false}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.status")}{" "}
            <span style={{ color: "#FF4444" }}>
              {t("colaboratorRegister.required")}
            </span>
          </TextRob16Font1S>
          <DropDown
            data={statusOptions}
            value={statusOptions.find((opt) => opt.value === status) || null}
            onChange={(value) => setStatus(value?.value as string)}
            placeholder={t("colaboratorRegister.status")}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "48px",
                backgroundColor: inputBgColor,
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </Stack>

        <Stack sx={{ gap: "8px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 400,
            }}
          >
            {t("colaboratorRegister.companyName")}
          </TextRob16Font1S>
          <DropDown
            data={companyOptions}
            value={
              selectedMSP
                ? {
                    label: selectedMSP.brandName,
                    value: selectedMSP.idBrandMaster,
                  }
                : null
            }
            onChange={(value) => {
              if (value) {
                const brand = brandMasterList.find(
                  (b) => b.idBrandMaster === value.value,
                );
                setSelectedMSP(brand || null);
                setIdBrandMaster(value.value as number);
              } else {
                setSelectedMSP(null);
                setIdBrandMaster(0);
              }
            }}
            placeholder={t("colaboratorRegister.companyName")}
            sx={{
              "& .MuiOutlinedInput-root": {
                height: "48px",
                backgroundColor: inputBgColor,
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "16px",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          marginTop: "16px",
        }}
      >
        <FullFilledButton
          label={t("colaboratorRegister.save")}
          onClick={handleSave}
          disabled={isLoading}
        />
        <UnfilledButton
          label={t("colaboratorRegister.clear")}
          onClick={handleClear}
          disabled={isLoading}
        />
      </Box>
    </Stack>
  );
};
