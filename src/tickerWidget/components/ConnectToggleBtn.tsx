import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { binanceSocketRepo } from '..';
import { WebsocketReadyState } from '../../shared/repos/WebSocketRepo';

export const ConnectToggleBtn: FC = () => {
  const [readyState, setReadyState] = useState<WebsocketReadyState>(
    WebsocketReadyState.CONNECTING,
  );

  useEffect(() => {
    binanceSocketRepo.onChangeStatus(setReadyState);
  }, []);

  const label = useMemo(() => {
    switch (readyState) {
      case WebsocketReadyState.OPEN:
        return 'Disconnect';
      case WebsocketReadyState.CLOSING:
        return 'Disconnecting...';
      case WebsocketReadyState.CLOSED:
        return 'Connect';
      default:
        return 'Connecting...';
    }
  }, [readyState]);

  const onToggle = useCallback(() => {
    switch (readyState) {
      case WebsocketReadyState.OPEN:
        setReadyState(WebsocketReadyState.CLOSING);
        binanceSocketRepo.close();
        break;
      case WebsocketReadyState.CLOSED:
        binanceSocketRepo.retry();
        break;
    }
  }, [readyState]);

  return (
    <div>
      <button onClick={onToggle}>{label}</button>
    </div>
  );
};
