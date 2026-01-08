import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import { TextRob14Font1Xs } from "../../../../components/Text1Xs";
import { Link } from "react-router-dom";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";

// TextRob14Font1Xs

interface IProps {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const KeepLogged = ({ checked, handleChange }: IProps) => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        width: "100%",
        marginTop: "-8px",
        marginBottom: "24px",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <FormControlLabel
        sx={{
          padding: 0,
          alignItems: "center",
          gap: "4px",
        }}
        control={
          <Checkbox
            sx={{
              padding: 0,
              paddingLeft: 1,
              ...(mode === "dark" && {
                "& .MuiSvgIcon-root": {
                  border: "1px solid white",
                  borderRadius: "4px",
                },
                "&.Mui-checked .MuiSvgIcon-root": {
                  border: "none",
                },
              }),
              "&.Mui-checked .MuiSvgIcon-root path": {
                fill: theme[mode].blueDark,
              },
            }}
            checked={checked}
            onChange={handleChange}
          />
        }
        label={
          <TextRob14Font1Xs
            sx={{
              color: theme[mode].primary,
            }}
          >
            {t("loginRegister.staySignedIn")}
          </TextRob14Font1Xs>
        }
      />
      <Link
        to="/recover-account"
        style={{
          textDecoration: "none",
          padding: "4px",
        }}
      >
        <TextRob14Font1Xs
          sx={{
            color: theme[mode].blueDark,
          }}
        >
          {t("loginRegister.forgotPassword")}
        </TextRob14Font1Xs>
      </Link>
    </Stack>
  );
};
