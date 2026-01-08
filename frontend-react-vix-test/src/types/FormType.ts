export interface IGenericOptions {
  label: string;
  value: unknown;
}

export type TOptions = IGenericOptions | null;

export interface IGenericOptionsTyped<T> {
  label: string;
  value: T;
}

export type TOptionsTyped<T> = IGenericOptionsTyped<T> | null;
