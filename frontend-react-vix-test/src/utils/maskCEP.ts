import { onlyDigits } from "./onlyDigits";

export const maskCEP = (v: string) => {
  const d = onlyDigits(v).slice(0, 8);
  return d.replace(/^(\d{5})(\d{1,3})$/, "$1-$2");
};
