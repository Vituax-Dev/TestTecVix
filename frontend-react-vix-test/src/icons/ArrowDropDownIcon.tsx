import { SVGProps } from "react";

export const ArrowDropDownIcon = ({
  fill,
  ...props
}: SVGProps<SVGSVGElement>) => {
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
        id="mask0_6016_2346"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20"
      >
        <rect width="20" height="20" fill={fill} />
      </mask>
      <g mask="url(#mask0_6016_2346)">
        <path
          d="M9.38953 12.7128L5.17442 8.08511C5.11628 8.02128 5.07267 7.95213 5.0436 7.87766C5.01453 7.80319 5 7.7234 5 7.6383C5 7.46809 5.05329 7.31915 5.15988 7.19149C5.26647 7.06383 5.40698 7 5.5814 7H14.4186C14.593 7 14.7335 7.06383 14.8401 7.19149C14.9467 7.31915 15 7.46809 15 7.6383C15 7.68085 14.9419 7.82979 14.8256 8.08511L10.6105 12.7128C10.5136 12.8191 10.4167 12.8936 10.3198 12.9362C10.2229 12.9787 10.1163 13 10 13C9.88372 13 9.77713 12.9787 9.68023 12.9362C9.58333 12.8936 9.48643 12.8191 9.38953 12.7128Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};
