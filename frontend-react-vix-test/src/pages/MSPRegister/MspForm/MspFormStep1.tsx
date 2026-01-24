import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { InputLabelTooltip } from "../../../components/Inputs/InputLabelTooltip";
import { TextRob16Font1S } from "../../../components/Text1S";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { useViaCep } from "../../../hooks/useViaCep";

interface IMspFormStep1Props {
  onContinue: () => void;
  onCancel: () => void;
}

export const MspFormStep1 = ({ onContinue, onCancel }: IMspFormStep1Props) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
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
    isPoc,
    setIsPoc,
    showError,
    setShowError,
    minConsumption,
    setMinConsumption,
    discountPercentage,
    setDiscountPercentage,
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
    district,
    setDistrict,
    cityCode,
    setCityCode,
  } = useZMspRegisterPage();

  const { fetchAddressByCep, isLoading: isLoadingCep } = useViaCep();

  const handleCepBlur = async () => {
    if (cep && cep.length >= 8) {
      const address = await fetchAddressByCep(cep);
      if (address) {
        setStreet(address.street);
        setDistrict(address.district);
        setCity(address.city);
        setCountryState(address.state);
        setCityCode(address.cityCode);
        // Preenche o país automaticamente como Brasil (CEP brasileiro)
        setLocality("Brasil");
      }
    }
  };

  const validateAndContinue = () => {
    // Validar campos obrigatórios
    if (!companyName || !locality || !cnpj || !sector || !contactEmail) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onContinue();
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
      {/* Título da seção */}
      <TextRob16Font1S
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        {t("mspRegister.companyInfos")}
      </TextRob16Font1S>

      {/* Primeira linha: Nome, Localização, CNPJ */}
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
          value={companyName}
          onChange={setCompanyName}
          label={
            <>
              {t("mspRegister.companyName")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("mspRegister.required")}
              </span>
            </>
          }
          placeholder="Vituax"
          sxContainer={{
            ...(showError && !companyName && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
        <InputLabelTooltip
          value={locality}
          onChange={setLocality}
          label={
            <>
              {t("mspRegister.location")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("mspRegister.required")}
              </span>
            </>
          }
          placeholder={t("mspRegister.locationPlaceholder")}
          sxContainer={{
            ...(showError && !locality && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
        <InputLabelTooltip
          value={cnpj}
          onChange={setCnpj}
          label={
            <>
              {t("mspRegister.cnpj")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("mspRegister.required")}
              </span>
            </>
          }
          placeholder="00.000.000/0001-00"
          sxContainer={{
            ...(showError && !cnpj && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
      </Box>

      {/* Segunda linha: Telefone, Setor, Email */}
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
          value={phone}
          onChange={setPhone}
          label={t("mspRegister.phone")}
          placeholder="(00) 00000-0000"
        />
        <InputLabelTooltip
          value={sector}
          onChange={setSector}
          label={
            <>
              {t("mspRegister.sector")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("mspRegister.required")}
              </span>
            </>
          }
          placeholder={t("mspRegister.sectorPlaceholder")}
          sxContainer={{
            ...(showError && !sector && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
        <InputLabelTooltip
          value={contactEmail}
          onChange={setContactEmail}
          label={
            <>
              {t("mspRegister.contactEmail")}{" "}
              <span style={{ color: theme[mode].gray }}>
                {t("mspRegister.required")}
              </span>
            </>
          }
          placeholder="vituax@gmail.com"
          type="email"
          sxContainer={{
            ...(showError && !contactEmail && {
              "& .MuiOutlinedInput-root fieldset": {
                borderColor: theme[mode].danger + " !important",
              },
            }),
          }}
        />
      </Box>

      {/* Seção de Endereço */}
      <TextRob16Font1S
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
          marginTop: "8px",
        }}
      >
        {t("mspRegister.addressSection")}
      </TextRob16Font1S>

      {/* Linha CEP */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ width: "200px", position: "relative" }}>
          <InputLabelTooltip
            value={cep}
            onChange={setCep}
            label={t("mspRegister.cep")}
            placeholder="00000-000"
            onBlur={handleCepBlur}
          />
          {isLoadingCep && (
            <CircularProgress 
              size={16} 
              sx={{ 
                position: "absolute", 
                right: 12, 
                top: "50%", 
                marginTop: "4px" 
              }} 
            />
          )}
        </Box>
      </Box>

      {/* Linha Rua, Número, Bairro */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "24px",
          "@media (max-width: 900px)": {
            gridTemplateColumns: "1fr 1fr",
          },
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <InputLabelTooltip
          value={street}
          onChange={setStreet}
          label={t("mspRegister.street")}
          placeholder={t("mspRegister.streetPlaceholder")}
        />
        <InputLabelTooltip
          value={streetNumber}
          onChange={setStreetNumber}
          label={t("mspRegister.streetNumber")}
          placeholder="123"
        />
        <InputLabelTooltip
          value={district}
          onChange={setDistrict}
          label={t("mspRegister.district")}
          placeholder={t("mspRegister.districtPlaceholder")}
        />
      </Box>

      {/* Linha Cidade, Estado */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          "@media (max-width: 600px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <InputLabelTooltip
          value={city}
          onChange={setCity}
          label={t("mspRegister.city")}
          placeholder={t("mspRegister.cityPlaceholder")}
        />
        <InputLabelTooltip
          value={countryState}
          onChange={setCountryState}
          label={t("mspRegister.state")}
          placeholder="SP"
        />
      </Box>

      {/* Divider */}
      <Box
        sx={{
          height: "1px",
          width: "100%",
          background: theme[mode].grayLight,
        }}
      />

      {/* Terceira linha: Consumo mínimo, Desconto, POC */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        <Box sx={{ flex: 1, minWidth: "200px", maxWidth: "300px" }}>
          <InputLabelTooltip
            value={minConsumption}
            onChange={setMinConsumption}
            label={t("mspRegister.minConsumption")}
            placeholder="0"
            type="number"
            sxContainer={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
            }}
          />
        </Box>
        <Box sx={{ flex: 1, minWidth: "200px", maxWidth: "300px" }}>
          <InputLabelTooltip
            value={discountPercentage}
            onChange={setDiscountPercentage}
            label={t("mspRegister.discountPercentage")}
            placeholder="0"
            endText="%"
            type="number"
            sxContainer={{
              "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                WebkitAppearance: "none",
                margin: 0,
              },
              "& input[type=number]": {
                MozAppearance: "textfield",
              },
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "40px",
            minWidth: "200px",
          }}
        >
          <CheckboxLabel
            label={t("mspRegister.isPoc")}
            checked={isPoc}
            handleChange={() => setIsPoc(!isPoc)}
          />
        </Box>
      </Box>

      {/* Botões de ação */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <Button
          onClick={validateAndContinue}
          sx={{
            background: theme[mode].blue,
            color: theme[mode].btnText,
            textTransform: "none",
            borderRadius: "12px",
            padding: "12px 32px",
            fontWeight: 500,
            "&:hover": {
              background: theme[mode].blueDark,
            },
          }}
        >
          {t("mspRegister.continue")}
        </Button>
        <Button
          onClick={onCancel}
          sx={{
            background: theme[mode].tertiary,
            color: theme[mode].primary,
            textTransform: "none",
            borderRadius: "12px",
            padding: "12px 32px",
            fontWeight: 500,
            "&:hover": {
              background: theme[mode].grayLight,
            },
          }}
        >
          {t("mspRegister.cancel")}
        </Button>
      </Box>

      {/* Mensagem de erro */}
      {showError && (
        <TextRob16Font1S
          sx={{
            color: theme[mode].danger,
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          {t("mspRegister.alertMessage")}
        </TextRob16Font1S>
      )}
    </Stack>
  );
};
