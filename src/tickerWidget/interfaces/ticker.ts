export interface IMiniTicker {
  e: '24hrMiniTicker'; // Event type
  E: number; // Event time
  s: string; // Symbol
  c: string; // Close price
  o: string; // Open price
  h: string; // High price
  l: string; // Low price
  v: string; // Total traded base asset volume
  q: string; // Total traded quote asset volume
}
export interface IMiniTickerShorten {
  s: string; // Symbol
  c: string; // Close price
  o: string; // Open price
  v: string; // Total traded base asset volume
}

export interface IMiniTickerStream {
  stream: string;
  data: Array<IMiniTicker>;
}
