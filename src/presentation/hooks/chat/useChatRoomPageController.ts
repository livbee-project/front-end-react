import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { ChatMessage, ChatRoomDetail, ChatUserInfo } from '@/domain/entities/Chat';
import type { ApplicationCardData } from '@/shared/utils/chatUtils';
import {
  extractApplicationData,
  normalizeApplicationPayload,
} from '@/shared/utils/chatUtils';
import { warn } from '@/shared/utils/logger';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useChatCounterpart } from '@/presentation/hooks/chat/useChatCounterpart';
import { useAutoScroll } from '@/presentation/hooks/chat/useAutoScroll';
import { useDisplayedMessages } from '@/presentation/hooks/chat/useDisplayedMessages';
import { useChatRoomDetail } from '@/presentation/hooks/chat/useChatRoomDetail';
import { useChatRoomSocket } from '@/presentation/hooks/chat/useChatRoomSocket';
import { useChatWebSocket } from '@/presentation/hooks/chat/useChatWebSocket';
import { useChatApplicationActions } from '@/presentation/hooks/chat/useChatApplicationActions';

interface ChatRoomState {
  campaignTitle?: string;
  portfolioTitle?: string;
  message?: string;
  availableDate?: string;
  availableTime?: string;
  roomId?: string;
}

export interface ChatRoomPageController {
  activeRoomId?: string;
  roomDetail: ChatRoomDetail | null;
  messages: ChatMessage[];
  displayedMessages: ChatMessage[];
  loading: boolean;
  error: string | null;
  isBrandUser: boolean;
  counterpart?: ChatUserInfo | null;
  displayName: string;
  displayRole: string;

  composer: string;
  sendError: string | null;

  scrollRef: ReturnType<typeof useAutoScroll>['scrollRef'];
  autoScroll: boolean;
  handleScroll: () => void;

  onBack: () => void;
  setComposer: (value: string) => void;
  onSend: () => void;

  extractApplicationData: (message: ChatMessage) => ApplicationCardData | null;
  onApplicationAccept: (applicationId?: string) => void;
  onApplicationReject: (applicationId?: string) => void;
  onPaymentClick: () => void;
  onScrollToBottom: () => void;
}

export const useChatRoomPageController = (): ChatRoomPageController => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ roomId: string }>();

  const fallbackState = useMemo(
    () => (location.state || {}) as ChatRoomState,
    [location.state]
  );

  const activeRoomId = params.roomId || fallbackState.roomId;

  const {
    roomDetail,
    messages,
    loading,
    error,
    sendMessage,
    markAsRead,
    appendMessage,
    updateReadStatus,
    refresh: refreshRoomDetail,
  } = useChatRoomDetail(activeRoomId);

  const [composer, setComposer] = useState('');
  const [sendError, setSendError] = useState<string | null>(null);

  const { showToast } = useToast();

  const myRole = roomDetail?.room.me.role;
  const isBrandUser = myRole === 'brand';

  const { counterpart, displayName, displayRole } = useChatCounterpart(roomDetail || undefined);

  const normalizeFn = useCallback(normalizeApplicationPayload, []);
  const extractFn = useCallback(
    (message: ChatMessage) => extractApplicationData(message, normalizeFn),
    [normalizeFn]
  );

  const displayedMessages = useDisplayedMessages({
    messages,
    roomDetail,
    fallbackState,
    activeRoomId,
    extractApplicationData: extractFn,
  });

  const { scrollRef, autoScroll, setAutoScroll, handleScroll } = useAutoScroll({
    observe: displayedMessages,
  });

  const onBack = useCallback(() => navigate(-1), [navigate]);

  const handleSend = useCallback(async () => {
    if (!composer.trim() || !activeRoomId) return;
    try {
      setSendError(null);
      await sendMessage({ content: composer.trim(), messageType: 'text' });
      setComposer('');
      setAutoScroll(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : '메시지를 전송하지 못했습니다.');
    }
  }, [activeRoomId, composer, sendMessage, setAutoScroll]);

  const { handleApplicationAction } = useChatApplicationActions({
    refreshRoomDetail,
  });

  const handleMarkAsRead = useCallback(() => {
    if (!roomDetail || messages.length === 0) return;
    const latest = messages[messages.length - 1];
    if (
      latest &&
      latest.senderId !== roomDetail.room.me.userId &&
      latest.id !== roomDetail.room.me.lastReadMessageId
    ) {
      markAsRead(latest.id);
    }
  }, [markAsRead, messages, roomDetail]);

  useEffect(() => {
    handleMarkAsRead();
  }, [handleMarkAsRead]);

  useLayoutEffect(() => {
    if (autoScroll && scrollRef.current && displayedMessages.length > 0 && !loading) {
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }
  }, [autoScroll, displayedMessages.length, loading, scrollRef]);

  const { handleSocketEvent } = useChatRoomSocket({
    activeRoomId,
    appendMessage,
    updateReadStatus,
    refreshRoomDetail,
  });

  useChatWebSocket({
    roomId: activeRoomId,
    enabled: Boolean(roomDetail && activeRoomId),
    onEvent: handleSocketEvent,
  });

  useEffect(() => {
    if (!activeRoomId) {
      warn('ChatRoomPage', 'activeRoomId가 없어 채팅 목록으로 이동');
      navigate('/mypage/messages', { replace: true });
    }
  }, [activeRoomId, navigate]);

  const onApplicationAccept = useCallback(
    (applicationId?: string) => handleApplicationAction('accept', applicationId),
    [handleApplicationAction]
  );
  const onApplicationReject = useCallback(
    (applicationId?: string) => handleApplicationAction('reject', applicationId),
    [handleApplicationAction]
  );

  const onPaymentClick = useCallback(() => {
    showToast('결제 기능은 준비 중입니다.', undefined, 'info');
  }, [showToast]);

  const onScrollToBottom = useCallback(() => setAutoScroll(true), [setAutoScroll]);

  return {
    activeRoomId,
    roomDetail,
    messages,
    displayedMessages,
    loading,
    error,
    isBrandUser,
    counterpart,
    displayName,
    displayRole,
    composer,
    sendError,
    scrollRef,
    autoScroll,
    handleScroll,
    onBack,
    setComposer,
    onSend: handleSend,
    extractApplicationData: extractFn,
    onApplicationAccept,
    onApplicationReject,
    onPaymentClick,
    onScrollToBottom,
  };
};

