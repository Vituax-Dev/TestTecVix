import moment from "moment-timezone";

export const toLocalTime = (
  date: Date | string,
  useBrazilTZ: boolean = false,
) => {
  try {
    if (!date) return "";

    if (useBrazilTZ) {
      // Força sempre o fuso horário de Brasília
      return moment
        .utc(date)
        .tz("America/Sao_Paulo")
        .format("DD/MM/YYYY HH:mm:ss");
    }

    // Usa o fuso horário local do navegador
    return moment(date).local().format("DD/MM/YYYY HH:mm:ss");
  } catch (err) {
    console.error("toLocalTime error:", err);
    return date;
  }
};
