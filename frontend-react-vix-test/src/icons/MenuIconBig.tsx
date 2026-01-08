import { SVGProps } from "react";

export const MenuIconBig = ({ fill, ...props }: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="40"
      height="28"
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="40" height="4" rx="2" fill={fill} />
      <rect y="12" width="40" height="4" rx="2" fill={fill} />
      <rect y="24" width="28.3333" height="4" rx="2" fill={fill} />
    </svg>
  );
};
