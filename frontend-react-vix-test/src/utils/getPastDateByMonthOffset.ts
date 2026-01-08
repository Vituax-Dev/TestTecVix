export const getPastDateByMonthOffset = (offset: number) => {
  if (offset === 0 || offset == null) {
    return null;
  }

  const now = new Date();
  now.setDate(1);
  now.setHours(0, 0, 0, 0);
  now.setMonth(now.getMonth() - offset + 1);
  return now;
};
