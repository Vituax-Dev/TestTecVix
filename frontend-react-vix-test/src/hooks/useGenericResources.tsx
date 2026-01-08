import { useTranslation } from "react-i18next";

export const useGenericResources = () => {
  const { t } = useTranslation();

  const timeZones = [
    {
      label: t("timezones.UTCMinus12"),
      value: "UTC-12",
    },
    {
      label: t("timezones.UTCMinus11"),
      value: "UTC-11",
    },
    {
      label: t("timezones.UTCMinus10"),
      value: "UTC-10",
    },
    {
      label: t("timezones.UTCMinus9"),
      value: "UTC-9",
    },
    {
      label: t("timezones.UTCMinus8"),
      value: "UTC-8",
    },
    {
      label: t("timezones.UTCMinus7"),
      value: "UTC-7",
    },
    {
      label: t("timezones.UTCMinus6"),
      value: "UTC-6",
    },
    {
      label: t("timezones.UTCMinus5"),
      value: "UTC-5",
    },
    {
      label: t("timezones.UTCMinus4"),
      value: "UTC-4",
    },
    {
      label: t("timezones.UTCMinus3"),
      value: "UTC-3",
    },
    {
      label: t("timezones.UTCMinus2"),
      value: "UTC-2",
    },
    {
      label: t("timezones.UTCMinus1"),
      value: "UTC-1",
    },
    {
      label: t("timezones.UTC"),
      value: "UTC",
    },
    {
      label: t("timezones.UTCPlus1"),
      value: "UTC+1",
    },
    {
      label: t("timezones.UTCPlus2"),
      value: "UTC+2",
    },
    {
      label: t("timezones.UTCPlus3"),
      value: "UTC+3",
    },
    {
      label: t("timezones.UTCPlus4"),
      value: "UTC+4",
    },
    {
      label: t("timezones.UTCPlus5"),
      value: "UTC+5",
    },
    {
      label: t("timezones.UTCPlus6"),
      value: "UTC+6",
    },
    {
      label: t("timezones.UTCPlus7"),
      value: "UTC+7",
    },
    {
      label: t("timezones.UTCPlus8"),
      value: "UTC+8",
    },
    {
      label: t("timezones.UTCPlus9"),
      value: "UTC+9",
    },
    {
      label: t("timezones.UTCPlus10"),
      value: "UTC+10",
    },
    {
      label: t("timezones.UTCPlus11"),
      value: "UTC+11",
    },
    {
      label: t("timezones.UTCPlus12"),
      value: "UTC+12",
    },
  ];

  return {
    timeZones,
  };
};
