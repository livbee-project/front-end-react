import React, { useCallback, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Info } from 'lucide-react';
import { useChatRoomDetail } from '@/presentation/hooks/useChatRoomDetail';
import { useChatWebSocket } from '@/presentation/hooks/useChatWebSocket';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useRepository } from '@/presentation/hooks/useRepository';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { ChatMessage } from '@/domain/entities/Chat';
import ContactHeader from '@/presentation/components/chat/ContactHeader';
import MessageGroup from '@/presentation/components/chat/MessageGroup';
import ComposerBar from '@/presentation/components/chat/ComposerBar';
import {
  normalizeApplicationPayload,
  extractApplicationData,
} from '@/shared/utils/chatUtils';
import { debug, warn, error as logError } from '@/shared/utils/logger';
import { useChatCounterpart } from '@/presentation/hooks/chat/useChatCounterpart';
import { useDisplayedMessages } from '@/presentation/hooks/chat/useDisplayedMessages';
import { useAutoScroll } from '@/presentation/hooks/chat/useAutoScroll';
import { useChatRoomSocket } from '@/presentation/hooks/chat/useChatRoomSocket';
import {
  PageWrapper,
  ChatColumn,
  FixedPanel,
  ScrollArea,
  ChatCard,
  Messages,
  MessageValue,
  ScrollHintButton,
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
  const campaignRepository = useRepository(CampaignRepository);

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

  const handleApplicationAction = useCallback(async (action: 'accept' | 'reject', applicationId?: string) => {
    if (!applicationId) {
      showToast('지원서 정보를 확인할 수 없습니다.', undefined, 'error');
      return;
    }

    const actionLabel = action === 'accept' ? '수락' : '거절';
    
    try {
      debug('ChatRoomPage', '지원서 상태 업데이트 요청:', { applicationId, action });
      
      const response = await campaignRepository.updateApplicationStatus({
        applicationId,
        action,
      });

      debug('ChatRoomPage', '지원서 상태 업데이트 응답:', response);

      showToast(`지원서를 ${actionLabel}했습니다.`);
      
      // 소켓을 통해 실시간 업데이트가 오므로, 여기서는 즉시 새로고침하지 않음
      // 백엔드에서 application.status.updated 이벤트를 보내면 handleSocketEvent에서 처리
      // 다만, 소켓 연결이 끊어진 경우를 대비해 약간의 지연 후 새로고침 (폴백)
      setTimeout(() => {
        debug('ChatRoomPage', '폴백: refreshRoomDetail 호출');
        refreshRoomDetail();
      }, 1000);
    } catch (error) {
      logError('ChatRoomPage', '지원서 상태 업데이트 실패:', error);
      const errorMessage = error instanceof Error ? error.message : `지원서 ${actionLabel}에 실패했습니다.`;
      showToast(errorMessage, undefined, 'error');
    }
  }, [campaignRepository, refreshRoomDetail, showToast]);

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
          <ChatCard>
            {loading && <MessageValue>채팅을 불러오는 중입니다...</MessageValue>}
            {error && <MessageValue>{error}</MessageValue>}
            {!loading && !error && displayedMessages.length === 0 && (
              <MessageValue>아직 주고받은 메시지가 없습니다.</MessageValue>
            )}
            <Messages>
              {displayedMessages.map((chatMessage, index) => {
                const previous = displayedMessages[index - 1];
                const applicationData = extractFn(chatMessage);
                const isPaymentRequest = chatMessage.metadata?.type === 'payment_request';
                // 지원서 카드는 항상 쇼호스트가 보낸 것으로 표시 (왼쪽 정렬)
                // 결제 요청 메시지는 브랜드가 보낸 것이므로 브랜드 계정에서는 오른쪽 정렬
                const isMyMessage = applicationData 
                  ? false 
                  : chatMessage.senderId === roomDetail?.room.me.userId;
                const isSystem = chatMessage.messageType === 'system' && !isPaymentRequest;
                
                // 디버깅: 결제 요청 메시지 렌더링 확인
                if (isPaymentRequest) {
                  debug('ChatRoomPage', '결제 요청 메시지 렌더링:', {
                    messageId: chatMessage.id,
                    senderId: chatMessage.senderId,
                    myUserId: roomDetail?.room.me.userId,
                    isMyMessage,
                    metadata: chatMessage.metadata,
                  });
                }
                
                return (
                  <MessageGroup
                    key={chatMessage.id}
                    message={chatMessage}
                    previousMessage={previous}
                    applicationData={applicationData}
                    isPaymentRequest={isPaymentRequest}
                    isMyMessage={isMyMessage}
                    isSystem={isSystem}
                    roomDetail={roomDetail ?? undefined}
                    isBrandUser={isBrandUser}
                    onApplicationAccept={(applicationId) => handleApplicationAction('accept', applicationId)}
                    onApplicationReject={(applicationId) => handleApplicationAction('reject', applicationId)}
                    onPaymentClick={() => {
                      // TODO: 결제 페이지로 이동
                      showToast('결제 기능은 준비 중입니다.', undefined, 'info');
                    }}
                  />
                );
              })}
            </Messages>
            {!loading && !error && !autoScroll && (
              <ScrollHintButton type="button" onClick={() => setAutoScroll(true)}>
                <Info size={14} />
                최근 메시지로 이동
              </ScrollHintButton>
            )}
          </ChatCard>
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
