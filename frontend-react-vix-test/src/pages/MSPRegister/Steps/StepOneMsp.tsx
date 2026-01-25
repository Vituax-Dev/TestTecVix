import { Box, Stack, Divider } from "@mui/material";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { SimpleInput } from "../../../components/Inputs/SimpleInput";
import { Btn } from "../../../components/Buttons/Btn";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob16Font1S } from "../../../components/Text1S";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { maskCNPJ } from "../../../utils/maskCNPJ";
import { maskPhone } from "../../../utils/maskPhone";
import { useState } from "react";

export const StepOneMsp = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();

  const {
    companyName,
    setCompanyName,
    locality,
    setLocality,
    cnpj,
    setCnpj,
    phone,
    setPhone,
    sector,
    setSector,
    contactEmail,
    setContactEmail,
    notesBrandMasterDescription,
    setNotesBrandMasterDescription,
    isPoc,
    setIsPoc,
    setActiveStep,
    cep,
    setCep,
    countryState,
    setCountryState,
    city,
    setCity,
    street,
    setStreet,
    streetNumber,
    setStreetNumber,
  } = useZMspRegisterPage();

  const [percentage, setPercentage] = useState("");

  const handleCEPBlur = async () => {
    const cleanCEP = cep.replace(/\D/g, "");

    if (cleanCEP.length === 8) {
      try {
        const response = await fetch(
          `https://viacep.com.br/ws/${cleanCEP}/json/`,
        );
        const data = await response.json();

        if (!data.erro) {
          setStreet(data.logradouro);
          setLocality("Brasil"); 
          setCity(data.localidade);
          setCountryState(data.uf); 

          console.log("Endereço preenchido automaticamente.");
        } else {
          alert("CEP não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const handleEmailChange = (val: string) => {
    setContactEmail(val.replace(/\s/g, "").toLowerCase());
  };

  const maskCEP = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{3})\d+?$/, "$1");
  };

  const maskMoney = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    const numberValue = Number(cleanValue) / 100;
    return numberValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const maskPercent = (value: string) => {
    let cleanValue = value.replace(/\D/g, "");
    if (Number(cleanValue) > 100) cleanValue = "100";
    return cleanValue ? `${cleanValue}%` : "";
  };

  const handleContinue = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isFormValid =
      companyName.trim() !== "" &&
      locality.trim() !== "" &&
      cnpj.length >= 18 &&
      sector.trim() !== "" &&
      contactEmail !== "" &&
      cep.trim() !== "" &&
      city.trim() !== "" &&
      countryState.trim() !== "";

    if (contactEmail !== "" && !emailRegex.test(contactEmail)) {
      alert("Email inválido, verifique e tente novamente");
      return;
    }

    if (isFormValid) {
      setActiveStep(1);
      window.scrollTo(0, 0);
    } else {
      alert("Por favor, preencha todos os campos obrigatórios corretamente.");
    }
  };

  const inputSx = {
    width: "85%",
    height: "65px",
    "& .MuiOutlinedInput-root": {
      height: "40px",
      borderRadius: "10px",
    },
    "& input": { padding: "6px 8px" },
  };

  return (
    <Stack sx={{ gap: "20px" }}>
      <TextRob16Font1S
        sx={{ color: theme[mode].primary, fontWeight: "600", fontSize: "22px" }}
      >
        {t("mspRegister.stepOneTitle")}
      </TextRob16Font1S>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "18px",
          "@media (max-width: 900px)": { gridTemplateColumns: "1fr" },
        }}
      >
        {[
          {
            label: t("mspRegister.companyName"),
            val: companyName,
            set: setCompanyName,
            ph: "Ex: VituaX",
            required: true,
          },
          {
            label: t("mspRegister.location"),
            val: locality,
            set: setLocality,
            ph: "Ex: Brasil",
            required: true,
          },
          {
            label: t("mspRegister.cnpj"),
            val: cnpj,
            set: (v: string) => setCnpj(maskCNPJ(v)),
            ph: "00.000.000/0000-00",
            required: true,
          },
          {
            label: t("mspRegister.phone"),
            val: phone,
            set: (v: string) => setPhone(maskPhone(v)),
            ph: "(00) 00000-0000",
            required: false,
          },
          {
            label: t("mspRegister.sector"),
            val: sector,
            set: setSector,
            ph: "Ex: Tecnologia",
            required: true,
          },
          {
            label: t("mspRegister.contactEmail"),
            val: contactEmail,
            set: handleEmailChange,
            ph: "contato@empresa.com",
            required: true,
          },
          {
            label: t("mspRegister.cep"),
            val: cep,
            set: (v: string) => setCep(maskCEP(v)),
            ph: "00000-000",
            required: true,
            onBlur: handleCEPBlur,
          },
          {
            label: t("mspRegister.state"),
            val: countryState,
            set: setCountryState,
            ph: "Ex: Paraíba",
            required: true,
          },
          {
            label: t("mspRegister.city"),
            val: city,
            set: setCity,
            ph: "Ex: Campina Grande",
            required: true,
          },
          {
            label: t("mspRegister.street"),
            val: street,
            set: setStreet,
            ph: "Logradouro...",
            required: false,
          },
          {
            label: t("mspRegister.number"),
            val: streetNumber,
            set: setStreetNumber,
            ph: "Ex: 123",
            required: false,
          },
        ].map((field, idx) => (
          <Stack key={idx} sx={{ gap: "2px" }}>
            <Stack direction="row" spacing={0.5} alignItems="baseline">
              <TextRob16Font1S
                sx={{
                  color: theme[mode].primary,
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                {field.label}
              </TextRob16Font1S>
              {field.required && (
                <TextRob16Font1S
                  sx={{
                    color: theme[mode].primary,
                    fontSize: "14px",
                    fontWeight: "400",
                    opacity: 0.6,
                  }}
                >
                  ({t("mspRegister.required")})
                </TextRob16Font1S>
              )}
            </Stack>
            <SimpleInput
              placeholder={field.ph}
              value={field.val}
              onChange={field.set}
              onBlur={field.onBlur}
              sx={inputSx}
            />
          </Stack>
        ))}
      </Box>

      <Divider
        sx={{ borderColor: theme[mode].grayLight, opacity: 0.5, my: 0.5 }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        <Stack sx={{ gap: "4px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "16px",
              fontWeight: "400",
            }}
          >
             {t("mspRegister.minConsumption")}
          </TextRob16Font1S>
          <SimpleInput
            placeholder="R$ 0,00"
            value={notesBrandMasterDescription}
            onChange={(v) => setNotesBrandMasterDescription(maskMoney(v))}
            sx={inputSx}
          />
        </Stack>

        <Stack sx={{ gap: "4px" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {t("mspRegister.discountPercent")}
          </TextRob16Font1S>
          <SimpleInput
            placeholder="0%"
            value={percentage}
            onChange={(v) => setPercentage(maskPercent(v))}
            sx={inputSx}
          />
        </Stack>

        <Stack sx={{ justifyContent: "center", pt: 2.5 }}>
          <CheckboxLabel
            label={t("mspRegister.isPoc")}
            checked={isPoc}
            handleChange={() => setIsPoc(!isPoc)}
          />
        </Stack>
      </Box>

      <Stack direction="row" gap="16px" sx={{ mt: 1 }}>
        <Btn
          onClick={handleContinue}
          sx={{
            background: theme[mode].blue,
            borderRadius: "8px",
            height: "60px",
            minWidth: "160px",
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].btnText,
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {t("generic.continue")}
          </TextRob16Font1S>
        </Btn>

        <Btn
          onClick={() => setActiveStep(0)}
          sx={{
            background: "transparent",
            border: `1px solid ${theme[mode].blue}`,
            borderRadius: "8px",
            height: "60px",
            minWidth: "160px",
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].blue,
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {t("generic.cancel")}
          </TextRob16Font1S>
        </Btn>
      </Stack>
    </Stack>
  );
};