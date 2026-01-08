import PersonIcon from "@mui/icons-material/Person";
import { useZUserProfile } from "../../../../stores/useZUserProfile";
import { useZTheme } from "../../../../stores/useZTheme";
import { Avatar, SxProps } from "@mui/material";
import { ImgFromDB } from "../../../../components/ImgFromDB";

interface Props {
  sx?: SxProps;
}
export const PictureProfile = ({ sx = {} }: Props) => {
  const { profileImgUrl } = useZUserProfile();
  const { theme, mode } = useZTheme();

  return (
    <>
      {profileImgUrl ? (
        <ImgFromDB
          style={{
            objectFit: "cover",
            boxShadow: " 0px 0px 4px 0px " + theme[mode].shadow + "7a",
            ...(sx as React.CSSProperties),
          }}
          alt="User Photo"
          src={profileImgUrl}
        />
      ) : (
        <Avatar
          sx={{
            boxShadow: " 0px 0px 4px 0px " + theme[mode].shadow + "7a",
            ...sx,
          }}
        >
          <PersonIcon />
        </Avatar>
      )}
    </>
  );
};
