import { onlyDigits } from "./onlyDigits";

export const isValidCPF = (cpf: string) => {
  const s = onlyDigits(cpf);
  if (s.length !== 11 || /^(\d)\1+$/.test(s)) return false;
  let t = 0;
  for (let i = 0; i < 9; i++) t += parseInt(s[i]) * (10 - i);
  let d1 = 11 - (t % 11);
  d1 = d1 > 9 ? 0 : d1;
  if (d1 !== parseInt(s[9])) return false;
  t = 0;
  for (let i = 0; i < 10; i++) t += parseInt(s[i]) * (11 - i);
  let d2 = 11 - (t % 11);
  d2 = d2 > 9 ? 0 : d2;
  return d2 === parseInt(s[10]);
};
