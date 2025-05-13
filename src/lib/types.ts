export type ToStringValues<T> = {
  [K in keyof T]: string;
};
