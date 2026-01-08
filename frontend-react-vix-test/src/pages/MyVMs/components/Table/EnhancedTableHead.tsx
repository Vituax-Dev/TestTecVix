import { useTranslation } from "react-i18next";
import TableHead from "@mui/material/TableHead";
import TableSortLabel from "@mui/material/TableSortLabel";
import { CloudCicleIcon } from "../../../../icons/CloudCicleIcon";
import { Order, SortByParams } from "../../../../stores/useZMyVMsList";
import { useZTheme } from "../../../../stores/useZTheme";
import { Box, Stack, TableCell, TableRow } from "@mui/material";

interface HeadCell {
  disablePadding: boolean;
  id: SortByParams;
  label: string;
  numeric: boolean;
  keepInMobile?: boolean;
  hiddenTextInMobile?: boolean;
  zeroPadding?: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: SortByParams,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { order, orderBy, onRequestSort } = props;
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();

  const headCells: readonly HeadCell[] = [
    {
      id: SortByParams.NAME,
      numeric: false,
      disablePadding: false,
      label: t("myVMs.vmName"),
      keepInMobile: true,
    },
    {
      id: SortByParams.STATUS,
      numeric: true,
      disablePadding: false,
      label: t("myVMs.status"),
      keepInMobile: true,
      hiddenTextInMobile: true,
      zeroPadding: true,
    },
    {
      id: SortByParams.CPU,
      numeric: true,
      disablePadding: false,
      label: t("myVMs.vCPU"),
    },
    {
      id: SortByParams.RAM,
      numeric: true,
      disablePadding: false,
      label: t("myVMs.ram"),
    },
    {
      id: SortByParams.DISK,
      numeric: true,
      disablePadding: false,
      label: t("myVMs.disk"),
    },
    {
      id: SortByParams.SOP,
      numeric: true,
      disablePadding: false,
      label: t("myVMs.so"),
    },
    {
      id: SortByParams.COMPANY,
      numeric: true,
      disablePadding: false,
      label: t("myVMs.company"),
      keepInMobile: true,
    },
  ];
  const createSortHandler = (
    event: React.MouseEvent<unknown>,
    property: SortByParams,
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        backgroundColor: theme[mode].grayLightV2,
        "& .MuiTableCell-root": {
          borderBottom: "none",
        },
      }}
    >
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{
              padding: "16px",
              ...(index === 0 && {
                padding: "16px",
              }),
              borderRadius: index === 0 ? "16px 0px 0px 0px" : "0px",
              color: theme[mode].dark,
              textTransform: "uppercase",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "20px",
              "& .Mui-active": {
                color: theme[mode].dark,
                backgroundColor: "transparent",
              },
              "& :hover": {
                color: theme[mode].dark,
                backgroundColor: "transparent",
              },
              "@media (max-width: 659px)": {
                fontSize: "12px",
                ...(!headCell.keepInMobile && { display: "none" }),
                ...(headCell.zeroPadding && { padding: "8px" }),
              },
            }}
            key={headCell.id}
            align={headCell.numeric ? "center" : "left"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <Stack
              sx={{
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: index === 0 ? "flex-start" : "center",
                "@media (max-width: 659px)": {
                  ...(headCell.hiddenTextInMobile && { display: "none" }),
                },
              }}
            >
              {index === 0 && (
                <CloudCicleIcon
                  fill={theme[mode].blueMedium}
                  style={{ marginRight: "16px" }}
                />
              )}
              {headCell.id === SortByParams.COMPANY ? (
                headCell.label
              ) : (
                <TableSortLabel
                  hidden
                  active={orderBy === headCell.id}
                  direction={orderBy !== headCell.id ? "asc" : order}
                  onClick={(e) => createSortHandler(e, headCell.id)}
                  sx={{
                    "& .MuiTableSortLabel-icon": {
                      fill: theme[mode].dark,
                      transition: "fill 0.3s ease",
                    },
                    "&:hover .MuiTableSortLabel-icon": {
                      fill: theme[mode].blue,
                    },
                  }}
                >
                  {index !== 0 && (
                    <Box sx={{ width: "22px", height: "18px" }} />
                  )}
                  {headCell.label}
                </TableSortLabel>
              )}
            </Stack>
          </TableCell>
        ))}
        <TableCell
          sx={{
            borderRadius: "0px 16px 0px 0px",
          }}
          key={headCells.length}
          padding={"normal"}
        >
          <Stack
            sx={{ width: "100%", maxWidth: "50px", height: "18px" }}
          ></Stack>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};
