import { IconButton, Modal, Stack, SxProps, TextField } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { TextRob20Font1M } from "../../../../components/Text1M";
import { TextRob12Font2Xs } from "../../../../components/Text2Xs";
import { Btn } from "../../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../../components/Text1S";
import { useTranslation } from "react-i18next";
import { CloseXIcon } from "../../../../icons/CloseXIcon";
import { useState } from "react";
import { VMCardIASugestion } from "./VMCardIASugestion";
import { EOS, useZVMSugestion } from "../../../../stores/useZVMSugestion";

interface IProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
}

export const ModaIACreateVM = ({ open, onClose, sx }: IProps) => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const { setVmSugestion } = useZVMSugestion();
  const [description, setDescription] = useState("");
  const [openVMCardSuggestion, setOpenVMCardSuggestion] = useState(false);
  const [sugestions, setSugestions] = useState({
    vCPU: 2,
    ram: 4,
    disk: 110,
    os: EOS.ubuntu2404,
  });
  const handleIASugestion = async () => {
    const response = {
      vCPU: 2,
      ram: 4,
      disk: 110,
      os: EOS.ubuntu2404,
    };
    setDescription("");
    if (!response) return;
    setSugestions({
      vCPU: +response.vCPU,
      ram: +response.ram,
      disk: +response.disk,
      os: response.os,
    });
    setOpenVMCardSuggestion(true);
  };

  const hadleAccept = () => {
    setOpenVMCardSuggestion(false);
    setVmSugestion(sugestions);
    onClose();
  };

  const handleGenerateAgain = () => {
    setOpenVMCardSuggestion(false);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "80%",
          maxWidth: "440px",
          height: "fit-content",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "12px",
          padding: "24px",
          gap: "12px",
          ...sx,
        }}
      >
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextRob20Font1M
            sx={{
              color: theme[mode].primary,
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            {t("createVm.createWithIa")}
          </TextRob20Font1M>
          <IconButton onClick={onClose}>
            <CloseXIcon fill={theme[mode].gray} />
          </IconButton>
        </Stack>
        <TextRob12Font2Xs
          sx={{
            color: theme[mode].gray,
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          {t("createVm.needHelp")}
        </TextRob12Font2Xs>
        {!openVMCardSuggestion && (
          <TextField
            id="outlined-multiline-static"
            label=""
            multiline
            rows={6}
            placeholder={t("createVm.iaChatPlaceholder")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                border: "none",
                color: theme[mode].primary,
                "& fieldset": {
                  borderColor: theme[mode].grayLight,
                },
                "&:hover fieldset": {
                  borderColor: theme[mode].blue,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme[mode].blue,
                  boxShadow: "0px 0px 4px " + theme[mode].blue,
                },
              },
            }}
          />
        )}
        {openVMCardSuggestion && (
          <Stack
            sx={{
              alignItems: "center",
            }}
          >
            <VMCardIASugestion
              vmName={t("createVm.sugestion")}
              os={sugestions.os}
              cpu={sugestions.vCPU}
              disk={sugestions.disk}
              memory={sugestions.ram}
              status="running"
              task={{
                action: "finished",
                operation: "start",
                error: "",
              }}
            />
          </Stack>
        )}
        {!openVMCardSuggestion && (
          <Btn
            disabled={!description}
            onClick={handleIASugestion}
            sx={{
              padding: "9px 24px",
              backgroundColor: theme[mode].blue,
              borderRadius: "12px",
              marginTop: "auto",
              maxWidth: "200px",
              height: "40px",
              minHeight: "40px",
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
              {t("createVm.generate")}
            </TextRob16Font1S>
          </Btn>
        )}
        {openVMCardSuggestion && (
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            sx={{
              gap: "16px",
            }}
          >
            <Btn
              onClick={hadleAccept}
              sx={{
                width: "100%",
                padding: "9px 24px",
                backgroundColor: theme[mode].blue,
                borderRadius: "12px",
                marginTop: "auto",
                maxWidth: "200px",
                height: "40px",
                minHeight: "40px",
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
                {/* {t("createVm.acceptSuggestionBtn")} */}
                {t("createVm.accept")}
              </TextRob16Font1S>
            </Btn>
            <Btn
              onClick={handleGenerateAgain}
              sx={{
                width: "100%",
                padding: "9px 24px",
                border: "1px solid " + theme[mode].blue,
                borderRadius: "12px",
                marginTop: "auto",
                maxWidth: "200px",
                height: "40px",
                minHeight: "40px",
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
                {/* {t("createVm.acceptSuggestionBtn")} */}
                {t("createVm.generateAgain")}
              </TextRob16Font1S>
            </Btn>
          </Stack>
        )}
      </Stack>
    </Modal>
  );
};
