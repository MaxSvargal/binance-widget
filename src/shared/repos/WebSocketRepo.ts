import { EventEmitter } from '../../shared/core/EventEmitter';

export class WebSocketRepo extends EventEmitter {
  private socket: WebSocket;

  constructor(private path: string) {
    super();
    this.socket = new WebSocket(path);
    this.subscribe();
  }

  private subscribe() {
    this.socket.onmessage = (event) => {
      try {
        const json = JSON.parse(event.data);
        this.emit(json.stream, json.data);
      } catch (err) {
        this.emit('error', { detail: 'WebSocket JSON parse error' });
      }
    };

    this.socket.onerror = (e) => {
      console.log('An error occurred', e);
    };

    this.socket.onclose = function (e) {
      console.log('connection closed', e.code, e.reason);
    };
  }

  public close(): void {
    this.socket.close();
  }

  public retry(): void {
    this.socket = new WebSocket(this.path);
    this.subscribe();
  }
}
