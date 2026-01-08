import { SwiperSlide } from "swiper/react";
import { VmCardSkeleton } from "./VmCardSkeleton";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

export const VmCardSkeletonList = () => {
  return (
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
      <SwiperSlide
        key={"loading"}
        style={{
          width: "fit-content",
        }}
      >
        <VmCardSkeleton />
      </SwiperSlide>
      ,
      <SwiperSlide
        key={"loading-2"}
        style={{
          width: "fit-content",
        }}
      >
        <VmCardSkeleton />
      </SwiperSlide>
      <SwiperSlide
        key={"loading-3"}
        style={{
          width: "fit-content",
        }}
      >
        <VmCardSkeleton />
      </SwiperSlide>
    </Swiper>
  );
};
