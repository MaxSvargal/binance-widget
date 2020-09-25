import { EventEmitter } from '../../shared/core/EventEmitter';

export enum WebsocketReadyState {
  CONNECTING = 'CONNECTING',
  OPEN = 'OPEN',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
}

export class WebSocketRepo extends EventEmitter {
  private socket: WebSocket;

  constructor(private path: string) {
    super();
    this.socket = new WebSocket(path);
    this.subscribe();
  }

  private subscribe() {
    this.socket.onopen = () => {
      this.emit('open');
    };

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
      this.emit('error', { detail: e });
    };

    this.socket.onclose = (e) => {
      console.log('Connection closed', e.code, e.reason);
      this.emit('close', { detail: e });
    };
  }

  private get status(): WebsocketReadyState {
    switch (this.socket.readyState) {
      case 1:
        return WebsocketReadyState.OPEN;
      case 2:
        return WebsocketReadyState.CLOSING;
      case 3:
        return WebsocketReadyState.CLOSED;
      default:
        return WebsocketReadyState.CONNECTING;
    }
  }

  public onChangeStatus(
    listener: (s: WebsocketReadyState) => void,
  ): () => void {
    const disposers = [
      this.on('open', () => listener(this.status)),
      this.on('error', () => listener(this.status)),
      this.on('close', () => listener(this.status)),
    ];

    return () => disposers.forEach((disposer) => disposer());
  }

  public close(): void {
    this.socket.close();
  }

  public retry(): void {
    this.socket = new WebSocket(this.path);
    this.subscribe();
  }
}
