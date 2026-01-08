import { Pagination, Box, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { ArrowLeftIcon, ArrowRightIcon } from "../../icons/ArrowsIcons";
import { Btn } from "../Buttons/Btn";
import { TextRob16Font1S } from "../Text1S";

interface IProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  limit: number;
  sx?: SxProps;
}

const CustomPagination = ({
  totalPages,
  currentPage,
  onPageChange,
  limit,
  sx,
}: IProps) => {
  const allPages = limit ? Math.ceil(totalPages / limit) : 1;
  const { t } = useTranslation();
  const { mode, theme } = useZTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        backgroundColor: theme[mode].grayLightV2,
        padding: "26px 24px",
        borderRadius: "0px 0px 16px 16px",
        ...sx,
      }}
    >
      {/* Prev*/}
      <Btn
        sx={{
          width: "224px",
          height: "36px",
          backgroundColor: "transparent",
          border: "1px solid " + theme[mode].gray,
          borderRadius: "12px",
          gap: "8px",
          ":disabled": {
            cursor: "not-allowed",
          },
          "@media (max-width: 659px)": {
            width: "fit-content",
            padding: "20px",
          },
        }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ArrowLeftIcon fill={theme[mode].gray} />
        <TextRob16Font1S
          sx={{
            color: theme[mode].gray,
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "20px",
            "@media (max-width: 659px)": {
              display: "none",
            },
          }}
        >
          {t("generic.prev")}
        </TextRob16Font1S>
      </Btn>

      {/* Pagination */}
      <Pagination
        count={allPages}
        page={currentPage}
        onChange={(_event, page) => onPageChange(page)}
        siblingCount={0}
        boundaryCount={1}
        shape="rounded"
        color="primary"
        hideNextButton
        hidePrevButton
        sx={{
          "& .MuiPaginationItem-root": {
            color: theme[mode].dark,
            fontWeight: "500",
            fontSize: "16px",
            fontFamily: "Roboto",
            lineHeight: "20px",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: theme[mode].blueLight,
            color: theme[mode].btnLightText,
            borderRadius: "12px",
            "&:hover": {
              backgroundColor: theme[mode].blueLight,
              opacity: 0.8,
            },
          },
        }}
      />

      {/* Next */}
      <Btn
        disabled={currentPage >= allPages}
        onClick={() => onPageChange(currentPage + 1)}
        sx={{
          width: "224px",
          height: "36px",
          backgroundColor: theme[mode].blue,
          borderRadius: "12px",
          gap: "8px",
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
          {t("generic.next")}
        </TextRob16Font1S>
        <ArrowRightIcon fill={theme[mode].btnText} />
      </Btn>
    </Box>
  );
};

export default CustomPagination;
