import { onlyDigits } from "./onlyDigits";

export const isValidCNPJ = (cnpj: string) => {
  const s = onlyDigits(cnpj);
  if (s.length !== 14 || /^(\d)\1+$/.test(s)) return false;
  let t = 0,
    p = 5;
  for (let i = 0; i < 12; i++) {
    t += parseInt(s[i]) * p;
    p = p === 2 ? 9 : p - 1;
  }
  let d1 = t % 11;
  d1 = d1 < 2 ? 0 : 11 - d1;
  if (d1 !== parseInt(s[12])) return false;
  t = 0;
  p = 6;
  for (let i = 0; i < 13; i++) {
    t += parseInt(s[i]) * p;
    p = p === 2 ? 9 : p - 1;
  }
  let d2 = t % 11;
  d2 = d2 < 2 ? 0 : 11 - d2;
  return d2 === parseInt(s[13]);
};
