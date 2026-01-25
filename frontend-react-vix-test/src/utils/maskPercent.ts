export const maskPercent = (value: string): string => {
  let cleaned = value.replace(/[^\d.]/g, "");

  const parts = cleaned.split(".");
  if (parts.length > 2) {
    cleaned = parts[0] + "." + parts.slice(1).join("");
  }

  if (parts.length === 2 && parts[1].length > 2) {
    cleaned = parts[0] + "." + parts[1].slice(0, 2);
  }

  const numValue = parseFloat(cleaned);
  if (!isNaN(numValue) && numValue > 100) {
    return "100";
  }

  if (cleaned.length > 6) {
    cleaned = cleaned.slice(0, 6);
  }

  return cleaned;
};
