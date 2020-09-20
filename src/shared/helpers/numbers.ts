export const numberPrettify = (num: number): string =>
  num.toFixed(8).replace(/^0+(\d)|(\d)0+$/gm, '$1$2');
