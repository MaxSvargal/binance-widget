import { WebSocketRepo } from '../../shared/repos/WebSocketRepo';
import { IMiniTicker, IMiniTickerShorten } from '../interfaces/ticker';

export class BinanceSocketRepo extends WebSocketRepo {
  constructor() {
    super('wss://stream.binance.com/stream?streams=!miniTicker@arr');
  }

  public onMiniTickerShorten(
    listener: (data: IMiniTickerShorten[]) => void,
  ): () => void {
    return this.on('!miniTicker@arr', (data: IMiniTicker[]) =>
      listener(
        data.map((v) => ({
          // Optimize memory usage
          s: v.s,
          c: v.c,
          o: v.o,
          v: v.v,
        })),
      ),
    );
  }
}
