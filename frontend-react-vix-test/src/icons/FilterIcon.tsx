import { SVGProps } from "react";

export const FilterIcon = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_6003_306"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill={fill} />
      </mask>
      <g mask="url(#mask0_6003_306)">
        <path
          d="M9.25192 16C9.03997 16 8.8623 15.9281 8.71892 15.7844C8.57554 15.6406 8.50385 15.4625 8.50385 15.25V10.75L4.16502 5.2C3.978 4.95 3.94995 4.6875 4.08086 4.4125C4.21177 4.1375 4.43931 4 4.76348 4H15.2365C15.5607 4 15.7882 4.1375 15.9191 4.4125C16.0501 4.6875 16.022 4.95 15.835 5.2L11.4961 10.75V15.25C11.4961 15.4625 11.4245 15.6406 11.2811 15.7844C11.1377 15.9281 10.96 16 10.7481 16H9.25192ZM10 10.225L13.703 5.5H6.29703L10 10.225Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};
