import { EventEmitter, Listener } from '../../shared/core/EventEmitter';

interface IBinanceSocketRepoEvents {
  on(eventName: 'tick', cb: Listener): void;
}

export class BinanceSocketRepo
  extends EventEmitter
  implements IBinanceSocketRepoEvents {
  socket: WebSocket;

  constructor(private path: string) {
    super();
    this.socket = new WebSocket(path);
    this.subscribe();
  }

  private subscribe() {
    this.socket.addEventListener('open', function () {
      this.send(
        JSON.stringify({
          method: 'subscribe',
          topic: 'allMiniTickers',
          symbols: ['$all'],
        }),
      );
    });

    this.socket.addEventListener('message', function (event) {
      console.log('Message from server ', event.data);
    });
  }

  public on(event: 'tick', listener: Listener): () => void {
    return super.on(event, listener);
  }

  public close(): void {
    this.socket.close();
  }

  public retry(): void {
    this.socket = new WebSocket(this.path);
  }
}

const b = new BinanceSocketRepo(
  'wss://stream.binance.com/stream?streams=!miniTicker@arr',
);
b.on('tick', (resp) => console.log(resp));
