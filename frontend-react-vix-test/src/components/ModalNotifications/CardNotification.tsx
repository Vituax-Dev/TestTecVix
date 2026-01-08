import { Chip, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob16FontL } from "../TextL";
import { useTranslation } from "react-i18next";
import { makeEllipsis } from "../../utils/makeEllipsis";
import { TextRob12Font2Xs } from "../Text2Xs";
import moment from "moment";
import { useState } from "react";
import { Btn } from "../Buttons/Btn";
import { ModalSimple } from "../Modal/ModalSimple";

interface IProps {
  notification: {
    isOpen: boolean;
    idNotification: number;
    message: string;
    title: string;
    date: string;
    priority: string;
    createdAt: string;
  };
}

export const CardNotification = ({ notification }: IProps) => {
  const { theme, mode } = useZTheme();
  const { i18n, t } = useTranslation();
  const [isOpenModalDetails, setIsOpenModalDetails] = useState(false);
  const [isOpenMessage, setIsOpenMessage] = useState(notification.isOpen);

  const hadlerOpenMessage = async () => {
    setIsOpenModalDetails(true);
    setIsOpenMessage(true);
    if (notification.isOpen) return;
    return null;
  };

  return (
    <>
      <Btn
        onClick={hadlerOpenMessage}
        sx={{
          borderRadius: "15px",
          backgroundColor: theme[mode].light,
          padding: "16px",
          flexDirection: "row",
          textAlign: "left",
          opacity: !isOpenMessage ? 1 : 0.7,
        }}
      >
        {/* Section 01 */}
        <Stack
          width={"95%"}
          sx={{
            gap: "8px",
          }}
        >
          {/* Line 01 */}
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Chip
              label=""
              sx={{
                backgroundColor:
                  notification.priority === "LOW"
                    ? theme[mode].ok
                    : notification.priority === "MEDIUM"
                      ? theme[mode].warning
                      : theme[mode].danger,
                minHeight: "0px",
                minWidth: "32px",
                height: "8px",
                width: "32px",
              }}
            />
            <TextRob16FontL
              sx={{
                color: theme[mode].primary,
                fontWeight: "500",
                lineHeight: "20px",
                ...makeEllipsis(),
              }}
            >
              {notification.message}
            </TextRob16FontL>
          </Stack>
          {/* Line 02  */}
          <Stack>
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].gray,
                fontSize: "10px",
                fontFamily: "Roboto",
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {`${moment(notification.createdAt).format(
                i18n.language === "en" ? "MM/DD/YYYY" : "DD/MM/YYYY",
              )}`}
            </TextRob12Font2Xs>
          </Stack>
        </Stack>
      </Btn>
      {Boolean(isOpenModalDetails) && (
        <ModalSimple
          open={isOpenModalDetails}
          onClose={() => setIsOpenModalDetails(false)}
          title={
            <TextRob16FontL
              sx={{
                color: theme[mode].primary,
                fontWeight: "500",
                lineHeight: "16px",
              }}
            >
              {t("generic.details")}
            </TextRob16FontL>
          }
          content={
            <TextRob16FontL
              sx={{
                color: theme[mode].primary,
                fontWeight: "400",
                lineHeight: "16px",
              }}
            >
              {notification.message}
            </TextRob16FontL>
          }
        />
      )}
    </>
  );
};
