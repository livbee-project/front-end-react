import { useEffect, useRef, useState } from 'react';
import { buildWebSocketUrl } from '@/shared/config/apiConfig';
import { getToken } from '@/shared/utils/storage';

interface ChatSocketEvent {
  type: string;
  payload?: any;
}

interface UseChatWebSocketOptions {
  roomId?: string;
  enabled?: boolean;
  onEvent?: (event: ChatSocketEvent) => void;
}

type SocketStatus = 'idle' | 'connecting' | 'open' | 'closed' | 'error';

export const useChatWebSocket = ({ roomId, enabled = true, onEvent }: UseChatWebSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<SocketStatus>('idle');
  const reconnectTimer = useRef<number | null>(null);

  useEffect(() => {
    if (!roomId || !enabled) {
      setStatus('idle');
      return () => {};
    }

    const token = getToken();
    if (!token) {
      setStatus('error');
      return () => {};
    }

    const connect = () => {
      const baseUrl = buildWebSocketUrl(`/chat/${roomId}`);
      const url = `${baseUrl}?token=${encodeURIComponent(token)}`;
      setStatus('connecting');
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        setStatus('open');
      };

      socket.onclose = () => {
        setStatus('closed');
        reconnectTimer.current = window.setTimeout(connect, 2000);
      };

      socket.onerror = () => {
        setStatus('error');
        socket.close();
      };

      socket.onmessage = (event) => {
        try {
          const data: ChatSocketEvent = JSON.parse(event.data);
          if (data.type === 'ping') {
            socket.send(JSON.stringify({ type: 'pong' }));
            return;
          }
          onEvent?.(data);
        } catch (error) {
          console.error('Failed to parse socket message', error);
        }
      };
    };

    connect();

    const pingInterval = window.setInterval(() => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, 20000);

    return () => {
      if (reconnectTimer.current) {
        window.clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      window.clearInterval(pingInterval);
      socketRef.current?.close();
      socketRef.current = null;
    };
  }, [roomId, enabled, onEvent]);

  const send = (payload: ChatSocketEvent) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    }
  };

  return {
    status,
    send,
  };
};

