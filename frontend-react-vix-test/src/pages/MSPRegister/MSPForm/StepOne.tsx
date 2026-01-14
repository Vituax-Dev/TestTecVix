import { Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../stores/useZTheme";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { TextRob16FontL } from "../../../components/TextL";
import { InputLabel } from "../../../components/Inputs/Input";
import { DropDownLabelToolTip } from "../../../components/Inputs/DropDownLabelToolTip";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { maskCNPJ } from "../../../utils/maskCNPJ";
import { maskPhone } from "../../../utils/maskPhone";

export const StepOne = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const {
    companyName,
    cnpj,
    phone,
    sector,
    contactEmail,
    locality,
    minConsumption,
    discountRate,
    isPoc,
    cep,
    countryState,
    city,
    street,
    streetNumber,
    setCompanyName,
    setCnpj,
    setPhone,
    setSector,
    setContactEmail,
    setLocality,
    setMinConsumption,
    setDiscountRate,
    setIsPoc,
    setCep,
    setCountryState,
    setCity,
    setStreet,
    setStreetNumber,
  } = useZMspRegisterPage();

  return (
    <Stack gap="24px" width="100%">
      <TextRob16FontL
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        {t("mspRegister.companyInfos")}
      </TextRob16FontL>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          "@media (max-width: 1024px)": {
            gridTemplateColumns: "1fr 1fr",
          },
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.companyName")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={companyName}
            onChange={setCompanyName}
            placeholder={t("mspRegister.companyName")}
            hasFocusEffect={true}
          />
        </Stack>

        <DropDownLabelToolTip
          label={
            <>
              {t("mspRegister.location")} {t("mspRegister.required")}
            </>
          }
          data={[
            { label: "Brasil", value: "BR" },
            { label: "Estados Unidos", value: "US" },
          ]}
          value={locality ? { label: locality, value: locality } : null}
          onChange={(val) => setLocality(val?.label || "")}
          placeholder={t("mspRegister.locationPlaceholder")}
        />

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.cnpj")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={maskCNPJ(cnpj)}
            onChange={(val) => setCnpj(val.replace(/\D/g, ""))}
            placeholder="00.000.000/0000-00"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.phone")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={maskPhone(phone)}
            onChange={(val) => setPhone(val.replace(/\D/g, ""))}
            placeholder="(00) 00000-0000"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.sector")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={sector}
            onChange={setSector}
            placeholder={t("mspRegister.sectorPlaceholder")}
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.contactEmail")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={contactEmail}
            onChange={setContactEmail}
            placeholder={t("mspRegister.emailPlaceholder")}
            type="email"
            hasFocusEffect={false}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          height: "1px",
          width: "100%",
          backgroundColor: theme[mode].grayLight,
          my: "8px",
        }}
      />

      <TextRob16FontL
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        Endereço
      </TextRob16FontL>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
          gap: "16px",
          "@media (max-width: 1024px)": {
            gridTemplateColumns: "1fr 1fr",
          },
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            CEP
          </TextRob16FontL>
          <InputLabel
            value={cep}
            onChange={(val) => setCep(val.replace(/\D/g, ""))}
            placeholder="00000-000"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            Estado
          </TextRob16FontL>
          <InputLabel
            value={countryState}
            onChange={setCountryState}
            placeholder="SP"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            Cidade
          </TextRob16FontL>
          <InputLabel
            value={city}
            onChange={setCity}
            placeholder="São Paulo"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            Rua
          </TextRob16FontL>
          <InputLabel
            value={street}
            onChange={setStreet}
            placeholder="Rua exemplo"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            Número
          </TextRob16FontL>
          <InputLabel
            value={streetNumber}
            onChange={setStreetNumber}
            placeholder="123"
            hasFocusEffect={false}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          height: "1px",
          width: "100%",
          backgroundColor: theme[mode].grayLight,
          my: "8px",
        }}
      />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          "@media (max-width: 1024px)": {
            gridTemplateColumns: "1fr 1fr",
          },
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.minConsumption")}
          </TextRob16FontL>
          <InputLabel
            value={minConsumption.toString()}
            onChange={(val) => setMinConsumption(Number(val) || 0)}
            placeholder="0"
            type="number"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.discountPercentage")}
          </TextRob16FontL>
          <InputLabel
            value={discountRate.toString()}
            onChange={(val) => setDiscountRate(Number(val) || 0)}
            placeholder="0"
            type="number"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack sx={{ alignSelf: "end" }}>
          <CheckboxLabel
            checked={isPoc}
            handleChange={(e) => setIsPoc(e.target.checked)}
            label={t("mspRegister.isPoc")}
          />
        </Stack>
      </Box>
    </Stack>
  );
};
