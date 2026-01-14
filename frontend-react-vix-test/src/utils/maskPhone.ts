export const maskPhone = (v: string) => {
  const digits = v.replace(/\D/g, "").slice(0, 11);
  
  if (!digits) return "";
  
  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})/, "($1")
      .replace(/^\((\d{2})(\d)/, "($1) $2")
      .replace(/^\((\d{2})\)\s(\d{4})(\d)/, "($1) $2-$3");
  }
  return digits
    .replace(/^(\d{2})/, "($1")
    .replace(/^\((\d{2})(\d)/, "($1) $2")
    .replace(/^\((\d{2})\)\s(\d{5})(\d)/, "($1) $2-$3");
};
