import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DropDowText } from "./DropDowText";
import { TOptions } from "../../../types/FormType";
import { EOS } from "../../../stores/useZVMSugestion";

interface IProps {
  value: TOptions | null;
  onChange: (value: TOptions | null) => void;
}

const osOptions: TOptions[] = Object.entries(EOS)
  .filter(([_key, value]) => value !== "")
  .map(([_key, value]) => ({
    value: value,
    label: value,
  }));

export const BTNISOsSection = ({ value, onChange }: IProps) => {
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        width: "100%",
        gap: "12px",
      }}
    >
      <DropDowText
        label={t("createVm.operationalSystem")}
        data={osOptions}
        value={value}
        onChange={onChange}
        placeholder={t("createVm.selectOS")}
      />
    </Stack>
  );
};
