import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Stack } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { LogoVituax } from "../../../../icons/LogoVituax";
import upixLogo from "./temp_upixLogo.png";
import upixLogoWhite from "./temp_upixLogoWhite.png";

const SlideSwiper = () => {
  const { mode } = useZTheme();

  return (
    <>
      <div>
        <svg
          width="48"
          height="32"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M45.4054 0L48 4.66667C46.2703 5.28889 44.5405 6.53333 42.8108 8.4C41.0811 10.1778 40.2162 12.3111 40.2162 14.8C40.2162 17.2889 40.8216 19.0222 42.0324 20C43.2432 20.8889 44.8865 21.3333 46.9622 21.3333V24.6667C46.9622 27.1556 46.0541 29.0222 44.2378 30.2667C42.4216 31.4222 40.2162 32 37.6216 32C33.4703 32 30.4865 30.6222 28.6703 27.8667C26.8541 25.1111 25.9459 22.0444 25.9459 18.6667C25.9459 14.9333 26.9838 11.7333 29.0595 9.06667C31.1351 6.31111 33.6865 4.13333 36.7135 2.53333C39.7405 0.933332 42.6378 0.0888877 45.4054 0ZM19.4595 0L22.0541 4.66667C20.3243 5.28889 18.5946 6.53333 16.8649 8.4C15.1351 10.1778 14.2703 12.3111 14.2703 14.8C14.2703 17.2889 14.8757 19.0222 16.0865 20C17.2973 20.8889 18.9405 21.3333 21.0162 21.3333V24.6667C21.0162 27.1556 20.1081 29.0222 18.2919 30.2667C16.4757 31.4222 14.2703 32 11.6757 32C7.52432 32 4.54054 30.6222 2.72432 27.8667C0.908108 25.1111 0 22.0444 0 18.6667C0 14.9333 1.03784 11.7333 3.11351 9.06667C5.18919 6.31111 7.74054 4.13333 10.7676 2.53333C13.7946 0.933332 16.6919 0.0888877 19.4595 0Z"
            fill="#C1DFF5"
          />
        </svg>
      </div>

      <p
        style={{
          color: "white",
          fontSize: "16px",
          lineHeight: "1.5",
          marginTop: "16px",
        }}
      >
        A cloud VituaX oferece uma infraestrutura escalável e de alta
        performance, essencial para nossas operações como MSP. Com gestão
        centralizada e recursos avançados, otimizamos entregas e garantimos
        eficiência operacional.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "24px",
          color: "white",
        }}
      >
        <img
          src={mode == "light" ? upixLogoWhite : upixLogo}
          alt="Foto do cliente"
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "16px",
          }}
        />

        <div>
          <strong style={{ display: "block", fontSize: "14px" }}>
            UPIX Networks
          </strong>
          <span style={{ fontSize: "12px", color: "#d0d0d0" }}>
            Global telecommunications company
          </span>
        </div>
      </div>
    </>
  );
};

export const Testemonials = () => {
  const { mode, theme } = useZTheme();

  return (
    <>
      <style>
        {`
        .swiper-pagination {
        margin: -12px 0px; 
        } 
          .swiper-pagination-bullet {
            background-color: ${theme[mode].blue};
            width: 12px;
            height: 12px;
            opacity: 1;
          }
          .swiper-pagination-bullet-active {
            background-color: ${theme[mode].mainBackground};
          }
        `}
      </style>

      <Stack
        className="w-full h-full"
        sx={{
          borderRadius: "32px",
          background: `linear-gradient(180deg, ${theme[mode].blue} 0%, ${theme[mode].blueDark} 100%)`,
          position: "relative",
          width: "100%",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Swiper */}
        <Stack
          className=" w-full h-full"
          sx={{
            width: "100%",
            maxWidth: "500px",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Swiper
            spaceBetween={16}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "16px",
              paddingBottom: "32px",
            }}
          >
            {Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide
                key={index}
                style={{
                  width: "400px",
                  height: "auto",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "24px",
                  borderRadius: "16px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                <SlideSwiper />
              </SwiperSlide>
            ))}
          </Swiper>
        </Stack>
        {/* Icon Logo */}
        <Stack
          sx={{
            position: "absolute",
            bottom: "-20px",
            right: "95px",
            width: "300px",
          }}
        >
          <LogoVituax />
        </Stack>
      </Stack>
    </>
  );
};
