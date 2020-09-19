export interface IProduct {
  s: string;
  st: string;
  b: string;
  q: string;
  ba: string;
  qa: string;
  i: number;
  ts: number;
  an: string;
  qn: string;
  o: number;
  h: number;
  l: number;
  c: number;
  v: number;
  qv: number;
  y: number;
  as: number;
  pm: string;
  pn: string;
  cs: number | null;
  tags: string[];
  etf: boolean;
}
export interface iGetProductsResponse {
  code: string;
  message: null;
  messageDetail: null;
  data: Array<IProduct>;
}

export interface IMiniTickerStream {
  stream: string;
  data: Array<IMiniTicker>;
}

export interface IMiniTicker {
  e: '24hrMiniTicker';
  E: number;
  s: string;
  c: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
}
