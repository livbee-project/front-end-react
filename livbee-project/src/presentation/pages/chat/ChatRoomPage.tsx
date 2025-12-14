import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useChatRoomDetail } from '@/presentation/hooks/chat/useChatRoomDetail';
import { useChatWebSocket } from '@/presentation/hooks/chat/useChatWebSocket';
import { useToast } from '@/presentation/contexts/ToastContext';
import type { ChatMessage } from '@/domain/entities/Chat';
import ContactHeader from '@/presentation/components/chat/ContactHeader';
import { ChatMessageList } from '@/presentation/components/chat/ChatMessageList';
import ComposerBar from '@/presentation/components/chat/ComposerBar';
import {
  normalizeApplicationPayload,
  extractApplicationData,
} from '@/shared/utils/chatUtils';
import { warn } from '@/shared/utils/logger';
import { useChatCounterpart } from '@/presentation/hooks/chat/useChatCounterpart';
import { useDisplayedMessages } from '@/presentation/hooks/chat/useDisplayedMessages';
import { useAutoScroll } from '@/presentation/hooks/chat/useAutoScroll';
import { useChatRoomSocket } from '@/presentation/hooks/chat/useChatRoomSocket';
import { useChatApplicationActions } from '@/presentation/hooks/chat/useChatApplicationActions';
import {
  PageWrapper,
  ChatColumn,
  FixedPanel,
  ScrollArea,
  MessageValue,
} from '@/presentation/components/chat/styled/ChatRoomStyles';

interface ChatRoomState {
  campaignTitle?: string;
  portfolioTitle?: string;
  message?: string;
  availableDate?: string;
  availableTime?: string;
  roomId?: string;
}

const ChatRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<{ roomId: string }>();
  const fallbackState = (location.state || {}) as ChatRoomState;
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

  // 메시지 정규화 함수 메모이제이션
  const normalizeFn = useCallback(normalizeApplicationPayload, []);

  // 지원서 데이터 추출 함수 메모이제이션
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

  const handleSend = async () => {
    if (!composer.trim() || !activeRoomId) return;
    try {
      setSendError(null);
      await sendMessage({ content: composer.trim(), messageType: 'text' });
      setComposer('');
      setAutoScroll(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : '메시지를 전송하지 못했습니다.');
    }
  };

  // 지원서 액션 처리 훅
  const { handleApplicationAction } = useChatApplicationActions({
    refreshRoomDetail,
  });

  const handleMarkAsRead = () => {
    if (!roomDetail || messages.length === 0) return;
    const latest = messages[messages.length - 1];
    if (
      latest &&
      latest.senderId !== roomDetail.room.me.userId &&
      latest.id !== roomDetail.room.me.lastReadMessageId
    ) {
      markAsRead(latest.id);
    }
  };

  React.useEffect(() => {
    handleMarkAsRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, roomDetail?.room.me.lastReadMessageId]);

  // 채팅 페이지가 처음 로드되거나 메시지가 추가될 때 항상 최신 메시지로 스크롤
  React.useLayoutEffect(() => {
    if (autoScroll && scrollRef.current && displayedMessages.length > 0 && !loading) {
      // requestAnimationFrame을 사용하여 DOM 업데이트 후 스크롤 실행
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    }
  }, [displayedMessages.length, autoScroll, loading]);

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

  // activeRoomId가 없으면 채팅 목록으로 리다이렉트
  React.useEffect(() => {
    if (!activeRoomId) {
      warn('ChatRoomPage', 'activeRoomId가 없어 채팅 목록으로 이동');
      navigate('/mypage/messages', { replace: true });
    }
  }, [activeRoomId, navigate]);

  if (!activeRoomId) {
    return (
      <PageWrapper>
        <MessageValue>채팅방 정보가 없습니다. 메시지 목록으로 이동 중...</MessageValue>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ChatColumn>
        <FixedPanel>
          <ContactHeader
            counterpart={counterpart}
            displayName={displayName}
            displayRole={displayRole}
            onBack={() => navigate(-1)}
          />
        </FixedPanel>

        <ScrollArea ref={scrollRef} onScroll={handleScroll}>
          <ChatMessageList
            displayedMessages={displayedMessages}
            roomDetail={roomDetail}
            loading={loading}
            error={error}
            autoScroll={autoScroll}
            isBrandUser={isBrandUser}
            extractApplicationData={extractFn}
            onApplicationAccept={(applicationId) => handleApplicationAction('accept', applicationId)}
            onApplicationReject={(applicationId) => handleApplicationAction('reject', applicationId)}
            onPaymentClick={() => {
              // TODO: 결제 페이지로 이동
              showToast('결제 기능은 준비 중입니다.', undefined, 'info');
            }}
            onScrollToBottom={() => setAutoScroll(true)}
          />
        </ScrollArea>
      </ChatColumn>

      <ComposerBar
        value={composer}
        error={sendError}
        loading={loading}
        disabled={Boolean(error)}
        onChange={setComposer}
        onSend={handleSend}
      />
    </PageWrapper>
  );
};

export default ChatRoomPage;
