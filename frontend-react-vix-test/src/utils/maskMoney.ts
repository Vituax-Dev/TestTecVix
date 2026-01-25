export const maskMoney = (value: string): string => {
  let cleaned = value.replace(/[^\d.]/g, "");

  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }

  if (parts.length === 2 && parts[1].length > 2) {
    cleaned = parts[0] + "." + parts[1].slice(0, 2);
  }

  // Limit integer part to 8 digits (up to 99,999,999.99)
  if (parts[0] && parts[0].length > 8) {
    cleaned = parts[0].slice(0, 8) + (parts[1] ? "." + parts[1] : "");
  }

  return cleaned;
};
