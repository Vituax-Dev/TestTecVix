export const logd = (...args: unknown[]) =>
  process.env.NODE_ENV !== "production" ? console.log(...args) : null;
