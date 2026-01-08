import { Stack, Skeleton, Box } from "@mui/material";
import { Screen } from "../../components/Screen";

export const LoginSkeleton = () => {
  return (
    <Screen
      sx={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        "@media (max-width: 1000px)": {
          flexDirection: "column",
          justifyContent: "flex-start",
        },
      }}
    >
      <Stack
        className=" h-full"
        sx={{
          width: "100%",
          maxWidth: "450px",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingLeft: "24px",
          paddingRight: "24px",
        }}
      >
        <Skeleton
          variant="text"
          width="20%"
          height={40}
          sx={{ ml: "auto", mb: 3 }}
        />

        <Skeleton
          variant="text"
          width="20%"
          height={60}
          sx={{ mr: "auto", mb: 0 }}
        />

        <Skeleton
          variant="text"
          width="50%"
          height={100}
          sx={{ mr: "auto", mb: 3 }}
        />

        <Stack width={"100%"} gap={"16px"} sx={{ mb: 3 }}>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={"50px"}
            sx={{ borderRadius: "16px" }}
          />
        </Stack>

        <Stack width={"100%"} gap={"16px"} sx={{ mb: 3 }}>
          <Skeleton variant="text" width={100} height={20} />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={"50px"}
            sx={{ borderRadius: "16px" }}
          />
        </Stack>

        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mb: 4,
            flexDirection: "row",
          }}
        >
          <Skeleton variant="text" width={80} height={20} />
          <Skeleton variant="text" width={120} height={20} sx={{ ml: 1 }} />
        </Stack>

        <Stack width={"100%"} gap={"16px"}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={"50px"}
            sx={{ borderRadius: "16px" }}
          />
        </Stack>

        {/* Rodapé */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            gap: 2,
            mt: "auto",
            pb: 1,
          }}
        >
          <Skeleton variant="text" width={50} height={20} />
          <Skeleton variant="text" width={70} height={20} />
          <Skeleton variant="text" width={100} height={20} />
        </Box>
      </Stack>
    </Screen>
  );
};

// return (
//   <Screen
//     sx={{
//       flexDirection: "row",
//       justifyContent: "center",
//       alignItems: "center",
//       "@media (max-width: 1000px)": {
//         flexDirection: "column",
//         justifyContent: "center",
//       },
//     }}
//   >
//     {/* Login box skeleton */}
//     <Stack
//       className="h-full"
//       sx={{
//         width: "100%",
//         maxWidth: "700px",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "16px",
//         padding: "24px",
//       }}
//     >
//       {/* Placeholder for Logo */}
//       <Skeleton variant="circular" width={80} height={80} animation="wave" />

//       {/* Placeholder for Title */}
//       <Skeleton variant="text" width="60%" height={40} animation="wave" />

//       {/* Skeleton for Username and Password fields */}
//       <Stack spacing={2} sx={{ width: "100%" }}>
//         <Skeleton
//           variant="rectangular"
//           width="100%"
//           height={48}
//           animation="wave"
//         />
//         <Skeleton
//           variant="rectangular"
//           width="100%"
//           height={48}
//           animation="wave"
//         />
//       </Stack>

//       {/* Skeleton for Checkbox and Forgot Password Link */}
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         sx={{ width: "100%" }}
//       >
//         <Skeleton
//           variant="rectangular"
//           width={24}
//           height={24}
//           animation="wave"
//         />
//         <Skeleton variant="text" width="30%" height={24} animation="wave" />
//         <Skeleton variant="text" width="40%" height={24} animation="wave" />
//       </Stack>

//       {/* Join Button Skeleton */}
//       <Skeleton
//         variant="rectangular"
//         width="100%"
//         height={48}
//         animation="wave"
//       />
//     </Stack>
//   </Screen>
// );
