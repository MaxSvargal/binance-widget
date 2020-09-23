export const numberPrettify = (num: number): string =>
  num.toFixed(8).replace(/^0+(\d)|(\d)0+$/gm, '$1$2');

export const getRatio = (x: number, y: number): number => ((y - x) / x) * 100;

export const getRatioOfStrings = (x: string, y: string): number =>
  getRatio(parseFloat(x), parseFloat(y));
