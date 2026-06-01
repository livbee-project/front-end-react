/**
 * 채팅방 소켓 이벤트 핸들러 훅
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/presentation/contexts/ToastContext';
import type { ChatMessage } from '@/domain/entities/Chat';
import type {
  MessageNewPayload,
  MessageReadPayload,
  ApplicationStatusUpdatedPayload,
  RoomDeletedPayload,
} from '@/domain/entities/WebSocket';
import {
  isMessageNewPayload,
  isMessageReadPayload,
  isApplicationStatusUpdatedPayload,
  isRoomDeletedPayload,
} from '@/domain/entities/WebSocket';
import { debug } from '@/shared/utils/logger';

interface UseChatRoomSocketParams {
  activeRoomId: string | undefined;
  appendMessage: (message: ChatMessage) => void;
  updateReadStatus: (payload: { userId: string; lastMessageId: string }) => void;
  refreshRoomDetail: () => void;
}

export const useChatRoomSocket = ({
  activeRoomId,
  appendMessage,
  updateReadStatus,
  refreshRoomDetail,
}: UseChatRoomSocketParams) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSocketEvent = useCallback(
    (event: { type: string; payload?: unknown }) => {
      debug('ChatRoomPage', '소켓 이벤트 수신:', event.type, event.payload);

      // 새 메시지 수신
      if (event.type === 'message.new' && event.payload && isMessageNewPayload(event.payload)) {
        const payload = event.payload as MessageNewPayload;
        debug('ChatRoomPage', '새 메시지 수신:', payload.message);
        appendMessage(payload.message);
        return;
      }

      // 메시지 읽음 상태 업데이트
      if (event.type === 'message.read' && event.payload && isMessageReadPayload(event.payload)) {
        const payload = event.payload as MessageReadPayload;
        updateReadStatus({ userId: payload.userId, lastMessageId: payload.lastMessageId });
        return;
      }

      // 지원서 상태 업데이트 (수락/거절)
      if (event.type === 'application.status.updated' && event.payload && isApplicationStatusUpdatedPayload(event.payload)) {
        const payload = event.payload as ApplicationStatusUpdatedPayload;
        debug('ChatRoomPage', '지원서 상태 업데이트 이벤트 수신:', payload.application);
        // 채팅방 정보 새로고침하여 업데이트된 지원서 상태 반영
        // 즉시 반영을 위해 refreshRoomDetail 호출
        refreshRoomDetail();
        return;
      }

      // 채팅방 삭제 이벤트
      if (event.type === 'room.deleted' && event.payload && isRoomDeletedPayload(event.payload)) {
        const payload = event.payload as RoomDeletedPayload;
        debug('ChatRoomPage', '채팅방 삭제 이벤트 수신:', payload);
        // 삭제된 채팅방이 현재 열려있는 채팅방이면 목록으로 이동
        if (payload.roomId === activeRoomId) {
          showToast('채팅방이 삭제되었습니다.');
          navigate('/mypage/messages', { replace: true });
        }
        return;
      }

      // 결제 요청 메시지는 message.new로 처리됨 (백엔드에서 메시지로 전송)
    },
    [appendMessage, updateReadStatus, refreshRoomDetail, activeRoomId, navigate, showToast]
  );

  return {
    handleSocketEvent,
  };
};

