export const ChartScaleIcon = ({
  mode = "dark",
}: {
  mode: "dark" | "light";
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="84"
      viewBox="0 0 128 84"
      fill="none"
    >
      <path
        d="M46.9053 42.9655L6 74H122V2L76.2105 42.9655H46.9053Z"
        fill={
          mode === "dark"
            ? "url(#paint0_linear_3387_1492)"
            : "url(#paint0_linear_3393_2101)"
        }
      />
      <path
        d="M6 74L42.9176 45.1984C44.3234 44.1016 46.0554 43.5059 47.8385 43.5059H72.3042C74.2647 43.5059 76.157 42.786 77.6218 41.4828L122 2"
        stroke={mode === "dark" ? "#647AF4" : "#C1CAFB"}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle
        cx="102"
        cy="20"
        r="5"
        fill={
          mode === "dark"
            ? "url(#paint1_linear_3387_1492)"
            : "url(#paint1_linear_3393_2101)"
        }
      />

      <linearGradient
        id={
          mode === "dark"
            ? "paint0_linear_3387_1492"
            : "paint0_linear_3393_2101"
        }
        x1="64"
        y1="2"
        x2="64"
        y2="84.6364"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={mode === "dark" ? "#4B5CB7" : "#C1CAFB"} />
        <stop
          offset="1"
          stopColor={mode === "dark" ? "#0F1216" : "#F9F9F9"}
          stopOpacity="0.6"
        />
      </linearGradient>
      <linearGradient
        id={
          mode === "dark"
            ? "paint1_linear_3387_1492"
            : "paint1_linear_3393_2101"
        }
        x1="99.25"
        y1="13"
        x2="102"
        y2="25"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C1CAFB" />
        <stop offset="1" stopColor="#647AF4" />
      </linearGradient>
    </svg>
  );
};
