import moment from "moment-timezone";

export const toLocalISOString = (date: Date) => {
  // Data em UTC de exemplo
  return moment(date).utcOffset(0, true).toISOString();
};
