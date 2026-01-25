import { Box, Stack, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { SimpleInput } from "../../components/Inputs/SimpleInput";
import { DropDown } from "../../components/Inputs/DropDown";
import { Btn } from "../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../components/Text1S";
import { maskPhone } from "../../utils/maskPhone";

export const ColaboratorForm = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();

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
    hiringDate,
    setHiringDate,
    status,
    setStatus,
    idBrandMaster,
    setIdBrandMaster,
    resetAll,
  } = useZColaboratorRegister();

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

    const isFormValid =
      colaboratorName.trim() !== "" &&
      emailRegex.test(email) &&
      username?.trim() !== "" &&
      password?.trim() !== "" &&
      position.trim() !== "" &&
      permission !== "" &&
      status !== "";

    if (isFormValid) {
      if (!emailRegex.test(email)) {
        alert("Email inválido");
        return;
      }

      if (password !== confirmPassword) {
        alert("As senhas não coincidem");
        return;
      }

      if (hiringDate && !dateRegex.test(hiringDate)) {
        alert("Formato de data inválido. Use DD/MM/AAAA");
        return;
      }

      alert("Registro pronto!");
    } else {
      alert("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const maskDate = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})\d+?$/, "$1");
  };

  const permissionOptions = [
    { label: "Member", value: "member" },
    { label: "Manager", value: "manager" },
    { label: "Administrator", value: "admin" },
  ];

  const statusOptions = [
    { label: t("colaboratorRegister.active"), value: "active" },
    { label: t("colaboratorRegister.inactive"), value: "inactive" },
  ];

  const companyOptions = [{ label: "Megas MSP Test", value: 0 }];

  const inputSx = {
    width: "85%",
    height: "65px",
    "& .MuiOutlinedInput-root": {
      height: "40px",
      borderRadius: "10px",
    },
    "& input": { padding: "6px 8px" },
  };

  const dropDownStyle = {
    width: "85%",

    "& .MuiOutlinedInput-root": {
      height: "50px",
      borderRadius: "20px",
      backgroundColor: theme[mode].tertiary,
      padding: "0 12px",
      transition: "box-shadow 0.2s ease-in-out",
      border: "none",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused": {
        backgroundColor: theme[mode].light,
        boxShadow: `0 0 8px 1px ${theme[mode].blue}66`,
        "& .MuiAutocomplete-input": {
          color: theme[mode].dark,
        },
      },
    },
    "& .MuiAutocomplete-input": {
      color: mode === "dark" ? theme[mode].light : "inherit",
      fontSize: "16px",
      padding: "0 !important",
    },
    "& .MuiAutocomplete-popupIndicator": {
      color: theme[mode].gray,
    },
    boxShadow: "none",
  };

  const renderLabel = (label: string, required?: boolean) => (
    <Stack direction="row" spacing={0.5} alignItems="baseline">
      <TextRob16Font1S
        sx={{ color: theme[mode].primary, fontSize: "14px", fontWeight: "400" }}
      >
        {label}
      </TextRob16Font1S>
      {required && (
        <TextRob16Font1S
          sx={{
            color: theme[mode].primary,
            fontSize: "12px",
            fontWeight: "400",
            opacity: 0.6,
          }}
        >
          ({t("mspRegister.required")})
        </TextRob16Font1S>
      )}
    </Stack>
  );

  return (
    <Stack sx={{ gap: "20px" }}>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0}>
            {renderLabel(t("colaboratorRegister.fullName"), true)}
            <SimpleInput
              value={colaboratorName}
              onChange={setColaboratorName}
              placeholder="John Doe"
              sx={inputSx}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.email"), true)}
            <SimpleInput
              value={email}
              onChange={setEmail}
              placeholder="john@email.com"
              sx={inputSx}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.phone"))}
            <SimpleInput
              value={phone}
              onChange={(v) => setPhone(maskPhone(v))}
              placeholder="(00) 0 0000-0000"
              sx={inputSx}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.username"), true)}
            <SimpleInput
              value={username || ""}
              onChange={setUsername}
              placeholder="Username"
              sx={inputSx}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.password"), true)}
            <SimpleInput
              type="password"
              value={password || ""}
              onChange={setPassword}
              placeholder="Password"
              sx={inputSx}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.confirmPassword"))}
            <SimpleInput
              type="password"
              value={confirmPassword || ""}
              onChange={setConfirmPassword}
              placeholder="Confirm Password"
              sx={inputSx}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.position"), true)}
            <SimpleInput
              value={position}
              onChange={setPosition}
              placeholder="Ex: Analista"
              sx={inputSx}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.department"))}
            <SimpleInput
              value={department}
              onChange={setDepartment}
              placeholder="Support"
              sx={inputSx}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.permission"), true)}
            <DropDown
              data={permissionOptions}
              value={
                permissionOptions.find((opt) => opt.value === permission) ||
                null
              }
              onChange={(val) => setPermission(val?.value as string)}
              sx={dropDownStyle}
            />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.hiringDate"))}
            <SimpleInput
              value={hiringDate}
              onChange={(v) => setHiringDate(maskDate(v))}
              placeholder="01/01/2025"
              sx={inputSx}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.status"), true)}
            <DropDown
              data={statusOptions}
              value={statusOptions.find((opt) => opt.value === status) || null}
              onChange={(val) => setStatus(val?.value as string)}
              sx={dropDownStyle}
            />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={0.5}>
            {renderLabel(t("colaboratorRegister.companyName"))}
            <DropDown
              data={companyOptions}
              value={
                companyOptions.find((opt) => opt.value === idBrandMaster) ||
                null
              }
              onChange={(val) => setIdBrandMaster(Number(val?.value))}
              sx={dropDownStyle}
            />
          </Stack>
        </Grid>
      </Grid>

      <Divider
        sx={{ borderColor: theme[mode].grayLight, opacity: 0.5, my: 1 }}
      />

      <Stack direction="row" spacing={2}>
        <Btn
          onClick={handleSave}
          sx={{
            background: theme[mode].blue,
            borderRadius: "8px",
            height: "50px",
            minWidth: "160px",
          }}
        >
          <TextRob16Font1S sx={{ color: "#FFF", fontWeight: "600" }}>
            {t("generic.save")}
          </TextRob16Font1S>
        </Btn>
        <Btn
          onClick={resetAll}
          sx={{
            background: "transparent",
            border: `1px solid ${theme[mode].blue}`,
            borderRadius: "8px",
            height: "50px",
            minWidth: "160px",
          }}
        >
          <TextRob16Font1S sx={{ color: theme[mode].blue, fontWeight: "600" }}>
            {t("generic.clear")}
          </TextRob16Font1S>
        </Btn>
      </Stack>
    </Stack>
  );
};
