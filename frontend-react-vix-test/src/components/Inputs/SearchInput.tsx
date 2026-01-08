import { IconButton, InputBase, Stack, SxProps } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { useZTheme } from "../../stores/useZTheme";
import { useZGlobalVar } from "../../stores/useZGlobalVar";
import { shadow } from "../../utils/shadow";

interface IProps {
  sx?: SxProps;
  sxContainer?: SxProps;
  sxIcon?: SxProps;
  placeholder?: string;
  sxPlaceholder?: SxProps;
  goSearch?: (Search: string) => void;
}
export const SearchInput = ({
  sx,
  sxContainer,
  sxPlaceholder,
  sxIcon,
  placeholder = "Search",
  goSearch,
}: IProps) => {
  const [search, setSearch] = useState("");
  const { theme, mode } = useZTheme();
  const { setSearch: setSearchGlobal } = useZGlobalVar();

  const handleSearch = () => {
    if (goSearch) {
      return goSearch(search);
    }
    return setSearchGlobal(search);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
      clearTimeout(timer);
    }, 1000);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <Stack
      sx={{
        flexDirection: "row",
        borderRadius: "3px",
        justifyContent: "flex-start",
        width: "100%",
        maxWidth: "460px",
        ...sxContainer,
      }}
    >
      <InputBase
        sx={{
          flex: 1,
          border: "none",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "12px",
          height: "40px",
          color: theme[mode].primary,
          boxShadow: `0px 4px 4px 0px ${shadow(mode)}`,
          ...sx,
        }}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        inputProps={{
          sx: {
            "&::placeholder": {
              color: theme[mode].tertiary,
              opacity: 1,
              ...sxPlaceholder,
            },
          },
        }}
        startAdornment={
          <IconButton
            type="button"
            sx={{
              p: 1,
              marginRight: 0.5,
              marginLeft: 0.5,
              "&:hover": {
                backgroundColor: "transparent",
              },
            }}
            onClick={handleSearch}
          >
            <SearchIcon sx={{ color: theme[mode].tertiary, ...sxIcon }} />
          </IconButton>
        }
      />
    </Stack>
  );
};
