export const maskPhone = (v: string) => {
  // (00) 0000-0000 ou (00) 00000-0000
  const digits = v.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 10) {
    // fixo
    return digits
      .replace(/^(\d{0,2})/, "($1")
      .replace(/^\((\d{2})(\d{0,4})/, "($1) $2")
      .replace(/^\((\d{2})\)\s(\d{4})(\d{0,4})/, "($1) $2-$3");
  }
  // celular
  return digits
    .replace(/^(\d{0,2})/, "($1")
    .replace(/^\((\d{2})(\d{0,5})/, "($1) $2")
    .replace(/^\((\d{2})\)\s(\d{5})(\d{0,4})/, "($1) $2-$3");
};
