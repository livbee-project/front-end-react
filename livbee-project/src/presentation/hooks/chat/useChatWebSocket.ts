import { useEffect, useRef, useState } from 'react';
import { buildWebSocketUrl } from '@/shared/config/apiConfig';
import { getToken } from '@/shared/utils/storage';
import type { WebSocketEvent } from '@/domain/entities/WebSocket';
import { debug, warn, error as logError } from '@/shared/utils/logger';

interface UseChatWebSocketOptions {
  roomId?: string;
  enabled?: boolean;
  onEvent?: (event: WebSocketEvent) => void;
}

type SocketStatus = 'idle' | 'connecting' | 'open' | 'closed' | 'error';

export const useChatWebSocket = ({ roomId, enabled = true, onEvent }: UseChatWebSocketOptions) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<SocketStatus>('idle');
  const reconnectTimer = useRef<number | null>(null);
  const reconnectAttempts = useRef<number>(0);
  const maxReconnectAttempts = 5; // 최대 재연결 시도 횟수
  const isUnmounting = useRef<boolean>(false);

  useEffect(() => {
    if (!roomId || !enabled) {
      setStatus('idle');
      reconnectAttempts.current = 0;
      return () => {};
    }

    const token = getToken();
    if (!token) {
      setStatus('error');
      return () => {};
    }

    isUnmounting.current = false;

    const connect = () => {
      // 최대 재연결 시도 횟수 초과 시 재연결 중단
      if (reconnectAttempts.current >= maxReconnectAttempts) {
        warn('useChatWebSocket', '최대 재연결 시도 횟수 초과. WebSocket 연결을 중단합니다.');
        setStatus('error');
        return;
      }

      // 이미 연결되어 있으면 재연결하지 않음
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        return;
      }

      const baseUrl = buildWebSocketUrl(`/chat/${roomId}`);
      const url = `${baseUrl}?token=${encodeURIComponent(token)}`;
      setStatus('connecting');
      
      // 디버깅: 연결 정보 출력
      debug('useChatWebSocket', '연결 시도:', {
        url: url.replace(/token=[^&]+/, 'token=***'), // 토큰 마스킹
        roomId,
        tokenExists: !!token,
        tokenLength: token?.length,
        reconnectAttempt: reconnectAttempts.current + 1,
        maxAttempts: maxReconnectAttempts,
      });
      
      try {
        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = () => {
          setStatus('open');
          reconnectAttempts.current = 0; // 연결 성공 시 재시도 횟수 리셋
          debug('useChatWebSocket', '연결 성공:', {
            url: url.replace(/token=[^&]+/, 'token=***'),
            readyState: socket.readyState,
            protocol: socket.protocol,
          });
        };

        socket.onclose = (event) => {
          setStatus('closed');
          
          // 디버깅: 종료 정보 출력
          const closeReasons: Record<number, string> = {
            1000: '정상 종료',
            1001: '엔드포인트가 사라짐 (서버 종료 또는 네트워크 문제)',
            1002: '프로토콜 오류',
            1003: '지원하지 않는 데이터 타입',
            1006: '비정상 종료 (연결 실패)',
            1007: '데이터 형식 오류',
            1008: '정책 위반',
            1009: '메시지가 너무 큼',
            1010: '확장 협상 실패',
            1011: '서버 오류',
          };
          
          warn('useChatWebSocket', '연결 종료:', {
            code: event.code,
            reason: event.reason || closeReasons[event.code] || '알 수 없는 이유',
            wasClean: event.wasClean,
            url: url.replace(/token=[^&]+/, 'token=***'),
            readyState: socket.readyState,
            reconnectAttempt: reconnectAttempts.current + 1,
          });
          
          // 정상 종료가 아니고, 컴포넌트가 언마운트되지 않았을 때만 재연결 시도
          if (!isUnmounting.current && event.code !== 1000) {
            reconnectAttempts.current += 1;
            reconnectTimer.current = window.setTimeout(connect, 2000 * reconnectAttempts.current); // 지수 백오프
          }
        };

        socket.onerror = (error) => {
          setStatus('error');
          // 개발 모드에서만 에러 로그 출력
          const socket = error.target as WebSocket;
          logError('useChatWebSocket', 'WebSocket 연결 오류:', {
            error,
            url: socket.url?.replace(/token=[^&]+/, 'token=***'),
            readyState: socket.readyState,
            readyStateText: socket.readyState === WebSocket.CONNECTING ? 'CONNECTING' :
                           socket.readyState === WebSocket.OPEN ? 'OPEN' :
                           socket.readyState === WebSocket.CLOSING ? 'CLOSING' :
                           socket.readyState === WebSocket.CLOSED ? 'CLOSED' : 'UNKNOWN',
            protocol: socket.protocol,
            extensions: socket.extensions,
          });
          
          // 가능한 원인 분석
          if (socket.readyState === WebSocket.CLOSED) {
            logError('useChatWebSocket', '가능한 원인:', [
              '1. 백엔드 WebSocket 서버가 실행되지 않음',
              '2. URL 형식이 잘못됨',
              '3. 인증 토큰이 유효하지 않음',
              '4. 네트워크 연결 문제',
              '5. CORS/프록시 설정 문제',
              '6. 백엔드 서버가 WebSocket을 지원하지 않음',
            ]);
          }
          // onerror에서 close를 호출하지 않음 (이미 close 상태일 수 있음)
        };

        socket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as WebSocketEvent;
            if (data.type === 'ping') {
              socket.send(JSON.stringify({ type: 'pong' }));
              return;
            }
            onEvent?.(data);
          } catch (error) {
            logError('useChatWebSocket', '메시지 파싱 실패:', error);
          }
        };
        } catch (error) {
          logError('useChatWebSocket', 'WebSocket 생성 실패:', error);
          setStatus('error');
        }
    };

    connect();

    const pingInterval = window.setInterval(() => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(JSON.stringify({ type: 'ping' }));
      }
    }, 20000);

    return () => {
      isUnmounting.current = true;
      if (reconnectTimer.current) {
        window.clearTimeout(reconnectTimer.current);
        reconnectTimer.current = null;
      }
      window.clearInterval(pingInterval);
      if (socketRef.current) {
        socketRef.current.close(1000, 'Component unmounting'); // 정상 종료 코드
        socketRef.current = null;
      }
      reconnectAttempts.current = 0;
    };
  }, [roomId, enabled, onEvent]);

  const send = (payload: WebSocketEvent) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(payload));
    }
  };

  return {
    status,
    send,
  };
};

