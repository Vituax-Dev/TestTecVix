import { Stack, IconButton } from "@mui/material";
import { VmCard } from "./VmCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { useZTheme } from "../../../../stores/useZTheme";
import { LeftCircleArrow } from "../../../../icons/LeftCircleArrow";
import { RightCircleArrow } from "../../../../icons/RightCircleArrow";
import { useListVms } from "../../../../hooks/useListVms";
import { VmCardSkeletonList } from "./VmCardSkeletonList";
import { useEffect } from "react";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { useZUserProfile } from "../../../../stores/useZUserProfile";
import { getVMOwnership } from "../../../../utils/getVMOwnership";
import { taskMock } from "../../../../types/VMTypes";

export const VmList = () => {
  const { mode, theme } = useZTheme();
  const { vmList, isLoading, fetchListVms } = useListVms();
  const { searchGlobalHeader } = useZGlobalVar();
  const { idBrand } = useZUserProfile();

  const vmsArr = vmList.map((vm) => ({
    vmId: vm.idVM,
    vmName: vm.vmName,
    status: vm.status,
    cpu: vm.vCPU,
    memory: vm.ram,
    disk: vm.disk,
    os: vm.os,
    task: taskMock,
    owner: getVMOwnership(vm).name,
    logo: getVMOwnership(vm).logo,
    idBrandMaster: vm.idBrandMaster,
  }));

  useEffect(() => {
    // Show all VMs regardless of company - permission is checked in VmCard
    fetchListVms({
      search: searchGlobalHeader,
      showAll: true,
      limit: 20,
    });
  }, [searchGlobalHeader]);

  if (vmsArr.length === 0) return null;

  return (
    <>
      <style>
        {`
        .swiper-pagination {
        margin: -12px 0px; 
        } 
          .swiper-pagination-bullet {
            background-color: ${theme[mode].gray};
            width: 12px;
            height: 12px;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background-color: ${theme[mode].blue};
          }
          /* Sobrescreve os estilos padrão dos botões do Swiper */
           .swiper-button-prev::after, .swiper-button-next::after {
            display: none;
          }
        `}
      </style>
      <Stack
        sx={{
          width: "100%",
          flexDirection: "row",
          padding: "0px 32px",
          paddingTop: "0px",
          overflowX: "auto",
          gap: "16px",
          margin: "0px auto",
          alignItems: "center",
          "@media (max-width: 744px)": {
            width: "100%",
            maxWidth: "100vw",
            padding: "16px",
          },
        }}
      >
        <IconButton
          className="swiper-button-prev"
          sx={{
            minHeight: "0px",
            minWidth: "0px",
            height: "25px",
            width: "25px",
            padding: "0px",
            "@media (max-width: 744px)": {
              display: "none",
            },
          }}
        >
          <LeftCircleArrow fill={theme[mode].blueMedium} />
        </IconButton>
        {!isLoading ? (
          <Swiper
            spaceBetween={"16px"}
            slidesPerView={"auto"}
            pagination={{
              clickable: true,
            }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            modules={[Pagination, Navigation]}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
              paddingBottom: "32px",
            }}
          >
            {vmsArr.map((vm, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "fit-content",
                }}
              >
                <VmCard key={vm.vmId} {...vm} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <VmCardSkeletonList />
        )}
        <IconButton
          className="swiper-button-next"
          sx={{
            minHeight: "0px",
            minWidth: "0px",
            height: "25px",
            width: "25px",
            padding: "0px",
            "@media (max-width: 744px)": {
              display: "none",
            },
          }}
        >
          <RightCircleArrow fill={theme[mode].blueMedium} />
        </IconButton>
      </Stack>
    </>
  );
};
