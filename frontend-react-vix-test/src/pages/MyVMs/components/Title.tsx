import { useTranslation } from "react-i18next";
import { TextRob32Font1L } from "../../../components/Text1L";
import { useZTheme } from "../../../stores/useZTheme";

export const Title = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  return (
    <TextRob32Font1L
      sx={{
        color: theme[mode].primary,
      }}
    >
      {t("sidebar.myVMs")}
    </TextRob32Font1L>
  );
};
