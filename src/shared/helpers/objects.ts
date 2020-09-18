// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>;

export const groupBy = <T extends AnyRecord>(
  xs: T[],
  key: keyof T,
): Record<string, T[]> =>
  xs.reduce((rv: AnyRecord, x: T) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
