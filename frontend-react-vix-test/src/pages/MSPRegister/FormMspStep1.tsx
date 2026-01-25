import { Divider, Stack, CircularProgress } from "@mui/material";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";
import { TextRob18Font2M } from "../../components/Text2M";
import { LabelInputVM } from "../VirtualMachine/components/LabelInputVM";
import { DropDowText } from "../VirtualMachine/components/DropDowText";
import { CheckboxLabel } from "../VirtualMachine/components/CheckboxLabel";
import { Btn } from "../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../components/Text1S";
import { TOptionsTyped } from "../../types/FormType";
import { LOCATION_OPTIONS, SECTOR_OPTIONS } from "../../configs/contants";
import { maskCNPJ } from "../../utils/maskCNPJ";
import { maskPhone } from "../../utils/maskPhone";
import { maskCEP } from "../../utils/maskCEP";
import { maskPercent } from "../../utils/maskPercent";
import { maskMoney } from "../../utils/maskMoney";
import { fetchAddressByCep } from "../../services/viaCepService";

interface FormMspStep1Props {
  onContinue: () => void;
  onCancel: () => void;
}

const locationOptions: TOptionsTyped<string>[] = [...LOCATION_OPTIONS];
const sectorOptions: TOptionsTyped<string>[] = [...SECTOR_OPTIONS];

export const FormMspStep1 = ({ onContinue, onCancel }: FormMspStep1Props) => {
  const { t } = useTranslation();
  const { mode, theme } = useZTheme();
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
    minConsumption,
    setMinConsumption,
    discountPercent,
    setDiscountPercent,
    cep,
    setCep,
    street,
    setStreet,
    streetNumber,
    setStreetNumber,
    district,
    setDistrict,
    city,
    setCity,
    countryState,
    setCountryState,
    setCityCode,
  } = useZMspRegisterPage();

  const [companyNameError, setCompanyNameError] = useState<string | null>(null);
  const [localityError, setLocalityError] = useState<string | null>(null);
  const [cnpjError, setCnpjError] = useState<string | null>(null);
  const [sectorError, setSectorError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);
  const [streetError, setStreetError] = useState<string | null>(null);
  const [streetNumberError, setStreetNumberError] = useState<string | null>(null);
  const [districtError, setDistrictError] = useState<string | null>(null);
  const [cityError, setCityError] = useState<string | null>(null);
  const [stateError, setStateError] = useState<string | null>(null);
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  const validateCompanyName = () => {
    if (!companyName.trim()) {
      setCompanyNameError(t("mspRegister.fillField"));
      return false;
    }
    setCompanyNameError(null);
    return true;
  };

  const validateLocality = () => {
    if (!locality) {
      setLocalityError(t("mspRegister.fillField"));
      return false;
    }
    setLocalityError(null);
    return true;
  };

  const validateCnpj = () => {
    if (!cnpj.trim()) {
      setCnpjError(t("mspRegister.fillField"));
      return false;
    }
    // Basic CNPJ format validation
    const cnpjClean = cnpj.replace(/\D/g, "");
    if (cnpjClean.length !== 14) {
      setCnpjError(t("mspRegister.cnpjAlertMessage"));
      return false;
    }
    setCnpjError(null);
    return true;
  };

  const validateSector = () => {
    if (!sector) {
      setSectorError(t("mspRegister.fillField"));
      return false;
    }
    setSectorError(null);
    return true;
  };

  const validateEmail = () => {
    if (!contactEmail.trim()) {
      setEmailError(t("mspRegister.fillField"));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail)) {
      setEmailError(t("mspRegister.emailAlertMessage"));
      return false;
    }
    setEmailError(null);
    return true;
  };

  const validateCep = () => {
    // remove non digit chars 
    const cleanCep = cep.replace(/\D/g, "");
    if (cleanCep.length !== 8) {
      setCepError(t("mspRegister.cepAlertMessage"));
      return false;
    }
    setCepError(null);
    return true;
  };

  const validateStreet = () => {
    if (!street.trim()) {
      setStreetError(t("mspRegister.fillField"));
      return false;
    }
    setStreetError(null);
    return true;
  };

  const validateStreetNumber = () => {
    if (!streetNumber.trim()) {
      setStreetNumberError(t("mspRegister.fillField"));
      return false;
    }
    setStreetNumberError(null);
    return true;
  };

  const validateDistrict = () => {
    if (!district.trim()) {
      setDistrictError(t("mspRegister.fillField"));
      return false;
    }
    setDistrictError(null);
    return true;
  };

  const validateCity = () => {
    if (!city.trim()) {
      setCityError(t("mspRegister.fillField"));
      return false;
    }
    setCityError(null);
    return true;
  };

  const validateState = () => {
    if (!countryState.trim()) {
      setStateError(t("mspRegister.fillField"));
      return false;
    }
    setStateError(null);
    return true;
  };

  const handleCepBlur = useCallback(async () => {
    const cleanCep = cep.replace(/\D/g, "");
    
    if (cleanCep.length !== 8) {
      if (cleanCep.length > 0) {
        setCepError(t("mspRegister.cepAlertMessage"));
      }
      return;
    }

    setIsLoadingCep(true);
    setCepError(null);

    const addressData = await fetchAddressByCep(cleanCep);

    if (addressData) {
      setStreet(addressData.street);
      setDistrict(addressData.district);
      setCity(addressData.city);
      setCountryState(addressData.state);
      setCityCode(addressData.cityCode);
      setCepError(null);
    } else {
      setCepError(t("mspRegister.addressNotFound"));
    }

    setIsLoadingCep(false);
  }, [cep, t, setStreet, setDistrict, setCity, setCountryState, setCityCode]);

  const handleContinue = () => {
    const isCompanyValid = validateCompanyName();
    const isLocalityValid = validateLocality();
    const isCnpjValid = validateCnpj();
    const isSectorValid = validateSector();
    const isEmailValid = validateEmail();
    const isCepValid = validateCep();
    const isStreetValid = validateStreet();
    const isStreetNumberValid = validateStreetNumber();
    const isDistrictValid = validateDistrict();
    const isCityValid = validateCity();
    const isStateValid = validateState();

    if (!isCompanyValid || !isLocalityValid || !isCnpjValid || !isSectorValid || !isEmailValid ||
        !isCepValid || !isStreetValid || !isStreetNumberValid || !isDistrictValid || !isCityValid || !isStateValid) {
      return;
    }
    onContinue();
  };

  const getLocationOption = (): TOptionsTyped<string> | null => {
    if (!locality) return null;
    return locationOptions.find((opt) => opt.value === locality || opt.label === locality) || null;
  };

  const getSectorOption = (): TOptionsTyped<string> | null => {
    if (!sector) return null;
    return sectorOptions.find((opt) => opt.value === sector || opt.label === sector) || null;
  };

  return (
    <Stack
      sx={{
        width: "100%",
        padding: "24px",
        gap: "24px",
      }}
    >
      {/* Title */}
      <TextRob18Font2M
        sx={{
          color: theme[mode].black,
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "24px",
        }}
      >
        {t("mspRegister.companyInfos")}
      </TextRob18Font2M>

      {/* Row 1: Company Name, Location, CNPJ */}
      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 768px)": {
            flexDirection: "row",
          },
        }}
      >
        <LabelInputVM
          onChange={(val) => {
            setCompanyName(val);
            if (companyNameError) setCompanyNameError(null);
          }}
          value={companyName}
          label={`${t("mspRegister.companyName")} ${t("mspRegister.required")}`}
          placeholder="Vituax"
          onBlur={validateCompanyName}
          error={companyNameError}
        />
        <DropDowText
          label={`${t("mspRegister.location")} ${t("mspRegister.required")}`}
          data={locationOptions}
          value={getLocationOption()}
          onChange={(val) => {
            setLocality(val?.value as string || "");
            if (localityError) setLocalityError(null);
          }}
          placeholder={t("mspRegister.locationPlaceholder")}
        />
        <LabelInputVM
          onChange={(val) => {
            setCnpj(maskCNPJ(val));
            if (cnpjError) setCnpjError(null);
          }}
          value={cnpj}
          label={`${t("mspRegister.cnpj")} ${t("mspRegister.required")}`}
          placeholder="00.000.000/0001-00"
          onBlur={validateCnpj}
          error={cnpjError}
        />
      </Stack>

      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 768px)": {
            flexDirection: "row",
          },
        }}
      >
        <LabelInputVM
          onChange={(val) => setPhone(maskPhone(val))}
          value={phone}
          label={t("mspRegister.phone")}
          placeholder="(00) 00000-0000"
        />
        <DropDowText
          label={`${t("mspRegister.sector")} ${t("mspRegister.required")}`}
          data={sectorOptions}
          value={getSectorOption()}
          onChange={(val) => {
            setSector(val?.value as string || "");
            if (sectorError) setSectorError(null);
          }}
          placeholder={t("mspRegister.sectorPlaceholder")}
        />
        <LabelInputVM
          onChange={(val) => {
            setContactEmail(val);
            if (emailError) setEmailError(null);
          }}
          value={contactEmail}
          label={`${t("mspRegister.contactEmail")} ${t("mspRegister.required")}`}
          placeholder="vituax@gmail.com"
          onBlur={validateEmail}
          error={emailError}
        />
      </Stack>

      <Divider sx={{ borderColor: theme[mode].grayLight }} />

      <TextRob18Font2M
        sx={{
          color: theme[mode].black,
          fontSize: "18px",
          fontWeight: "500",
          lineHeight: "24px",
        }}
      >
        {t("mspRegister.address")}
      </TextRob18Font2M>

      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 768px)": {
            flexDirection: "row",
          },
        }}
      >
        <Stack
          sx={{
            position: "relative",
            "@media (min-width: 768px)": {
              maxWidth: "180px",
              minWidth: "180px",
            },
          }}
        >
          <LabelInputVM
            onChange={(val) => {
              setCep(maskCEP(val));
              if (cepError) setCepError(null);
            }}
            value={cep}
            label={`${t("mspRegister.cep")} ${t("mspRegister.required")}`}
            placeholder="00000-000"
            onBlur={handleCepBlur}
            error={cepError}
          />
          {isLoadingCep && (
            <CircularProgress
              size={20}
              sx={{
                position: "absolute",
                right: "12px",
                top: "40px",
                color: theme[mode].primary,
              }}
            />
          )}
        </Stack>
        <LabelInputVM
          onChange={(val) => {
            setStreet(val);
            if (streetError) setStreetError(null);
          }}
          value={street}
          label={`${t("mspRegister.street")} ${t("mspRegister.required")}`}
          placeholder={t("mspRegister.streetPlaceholder")}
          onBlur={validateStreet}
          error={streetError}
          containerSx={{
            flex: 1,
          }}
        />
        <LabelInputVM
          onChange={(val) => {
            setStreetNumber(val);
            if (streetNumberError) setStreetNumberError(null);
          }}
          value={streetNumber}
          label={`${t("mspRegister.number")} ${t("mspRegister.required")}`}
          placeholder="123"
          onBlur={validateStreetNumber}
          error={streetNumberError}
          containerSx={{
            "@media (min-width: 768px)": {
              maxWidth: "160px",
              minWidth: "160px",
            },
          }}
        />
      </Stack>

      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 768px)": {
            flexDirection: "row",
          },
        }}
      >
        <LabelInputVM
          onChange={(val) => {
            setDistrict(val);
            if (districtError) setDistrictError(null);
          }}
          value={district}
          label={`${t("mspRegister.district")} ${t("mspRegister.required")}`}
          placeholder={t("mspRegister.districtPlaceholder")}
          onBlur={validateDistrict}
          error={districtError}
          containerSx={{
            flex: 1,
          }}
        />
        <LabelInputVM
          onChange={(val) => {
            setCity(val);
            if (cityError) setCityError(null);
          }}
          value={city}
          label={`${t("mspRegister.city")} ${t("mspRegister.required")}`}
          placeholder={t("mspRegister.cityPlaceholder")}
          onBlur={validateCity}
          error={cityError}
          containerSx={{
            flex: 1,
          }}
        />
        <LabelInputVM
          onChange={(val) => {
            setCountryState(val);
            if (stateError) setStateError(null);
          }}
          value={countryState}
          label={`${t("mspRegister.countryState")} ${t("mspRegister.required")}`}
          placeholder={t("mspRegister.countryStatePlaceholder")}
          onBlur={validateState}
          error={stateError}
          containerSx={{
            "@media (min-width: 768px)": {
              maxWidth: "160px",
              minWidth: "160px",
            },
          }}
        />
      </Stack>

      <Divider sx={{ borderColor: theme[mode].grayLight }} />

      <Stack
        sx={{
          gap: "24px",
          "@media (min-width: 768px)": {
            flexDirection: "row",
            alignItems: "flex-end",
          },
        }}
      >
        <LabelInputVM
          onChange={(val) => setMinConsumption(maskMoney(val))}
          value={minConsumption}
          label={t("mspRegister.minConsumption")}
          placeholder="0"
          containerSx={{
            "@media (min-width: 768px)": {
              maxWidth: "280px",
            },
          }}
        />
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "flex-end",
            gap: "8px",
            "@media (min-width: 768px)": {
              maxWidth: "200px",
            },
          }}
        >
          <LabelInputVM
            onChange={(val) => setDiscountPercent(maskPercent(val))}
            value={discountPercent}
            label={t("mspRegister.discountPercentage")}
            placeholder="0"
          />
          <TextRob16Font1S
            sx={{
              color: theme[mode].primary,
              paddingBottom: "12px",
            }}
          >
            %
          </TextRob16Font1S>
        </Stack>
        <CheckboxLabel
          value={isPoc}
          onChange={setIsPoc}
          label={t("mspRegister.isPoc")}
          sx={{
            paddingBottom: "8px",
          }}
        />
      </Stack>

      {/* Action Buttons */}
      <Stack
        sx={{
          flexDirection: "row",
          gap: "24px",
        }}
      >
        <Btn
          onClick={handleContinue}
          sx={{
            padding: "9px 24px",
            backgroundColor: theme[mode].blue,
            borderRadius: "12px",
            minWidth: "160px",
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].btnText,
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            {t("mspRegister.continue")}
          </TextRob16Font1S>
        </Btn>
        <Btn
          onClick={onCancel}
          sx={{
            padding: "9px 24px",
            backgroundColor: theme[mode].grayLight,
            borderRadius: "12px",
            minWidth: "120px",
          }}
        >
          <TextRob16Font1S
            sx={{
              color: theme[mode].gray,
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "16px",
            }}
          >
            {t("mspRegister.cancel")}
          </TextRob16Font1S>
        </Btn>
      </Stack>
    </Stack>
  );
};
