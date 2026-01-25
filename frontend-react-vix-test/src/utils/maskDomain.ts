export const maskDomain = (v: string) => {
  // Format: xx.xxx.xxx
  const digits = v.replace(/\D/g, "").slice(0, 8);
  return digits
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
};
