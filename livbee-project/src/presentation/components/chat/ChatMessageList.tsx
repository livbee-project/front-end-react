import React from 'react';
import { Info } from 'lucide-react';
import type { ChatMessage, ChatRoomDetail } from '@/domain/entities/Chat';
import type { ApplicationCardData } from '@/shared/utils/chatUtils';
import MessageGroup from '@/presentation/components/chat/MessageGroup';
import { debug } from '@/shared/utils/logger';
import {
  ChatCard,
  Messages,
  MessageValue,
  ScrollHintButton,
} from '@/presentation/components/chat/styled/ChatRoomStyles';

interface ChatMessageListProps {
  displayedMessages: ChatMessage[];
  roomDetail: ChatRoomDetail | null;
  loading: boolean;
  error: string | null;
  autoScroll: boolean;
  isBrandUser: boolean;
  extractApplicationData: (message: ChatMessage) => ApplicationCardData | null;
  onApplicationAccept: (applicationId?: string) => void;
  onApplicationReject: (applicationId?: string) => void;
  onPaymentClick: () => void;
  onScrollToBottom: () => void;
}

/**
 * 채팅 메시지 리스트를 렌더링하는 컴포넌트
 */
export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  displayedMessages,
  roomDetail,
  loading,
  error,
  autoScroll,
  isBrandUser,
  extractApplicationData,
  onApplicationAccept,
  onApplicationReject,
  onPaymentClick,
  onScrollToBottom,
}) => {
  return (
    <ChatCard>
      {loading && <MessageValue>채팅을 불러오는 중입니다...</MessageValue>}
      {error && <MessageValue>{error}</MessageValue>}
      {!loading && !error && displayedMessages.length === 0 && (
        <MessageValue>아직 주고받은 메시지가 없습니다.</MessageValue>
      )}
      <Messages>
        {displayedMessages.map((chatMessage, index) => {
          const previous = displayedMessages[index - 1];
          const applicationData = extractApplicationData(chatMessage);
          const isPaymentRequest = chatMessage.metadata?.type === 'payment_request';
          // 지원서 카드는 항상 쇼호스트가 보낸 것으로 표시 (왼쪽 정렬)
          // 결제 요청 메시지는 브랜드가 보낸 것이므로 브랜드 계정에서는 오른쪽 정렬
          const isMyMessage = applicationData
            ? false
            : chatMessage.senderId === roomDetail?.room.me.userId;
          const isSystem = chatMessage.messageType === 'system' && !isPaymentRequest;

          // 디버깅: 결제 요청 메시지 렌더링 확인
          if (isPaymentRequest) {
            debug('ChatMessageList', '결제 요청 메시지 렌더링:', {
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
              onApplicationAccept={onApplicationAccept}
              onApplicationReject={onApplicationReject}
              onPaymentClick={onPaymentClick}
            />
          );
        })}
      </Messages>
      {!loading && !error && !autoScroll && (
        <ScrollHintButton type="button" onClick={onScrollToBottom}>
          <Info size={14} />
          최근 메시지로 이동
        </ScrollHintButton>
      )}
    </ChatCard>
  );
};

