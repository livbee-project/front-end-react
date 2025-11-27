import React from 'react';
import styled from 'styled-components';
import ApplicationCard from './ApplicationCard';
import PaymentRequestCard from './PaymentRequestCard';
import type { ChatMessage, ChatRoomDetail } from '@/domain/entities/Chat';
import type { ApplicationCardData } from '@/shared/utils/chatUtils';
import { formatTimestamp, formatDateLabel } from '@/shared/utils/chatUtils';

interface MessageGroupProps {
  message: ChatMessage;
  previousMessage?: ChatMessage;
  applicationData: ApplicationCardData | null;
  isPaymentRequest: boolean;
  isMyMessage: boolean;
  isSystem: boolean;
  roomDetail?: ChatRoomDetail;
  isBrandUser: boolean;
  onApplicationAccept: (applicationId?: string) => void;
  onApplicationReject: (applicationId?: string) => void;
  onPaymentClick: () => void;
}

const MessageGroup: React.FC<MessageGroupProps> = ({
  message,
  previousMessage,
  applicationData,
  isPaymentRequest,
  isMyMessage,
  isSystem,
  roomDetail,
  isBrandUser,
  onApplicationAccept,
  onApplicationReject,
  onPaymentClick,
}) => {
  const showDivider =
    !previousMessage ||
    new Date(previousMessage.createdAt).toDateString() !==
      new Date(message.createdAt).toDateString();

  return (
    <React.Fragment>
      {showDivider && <DateDivider>{formatDateLabel(message.createdAt)}</DateDivider>}
      <MessageGroupContainer $align={isMyMessage ? 'end' : 'start'}>
        {applicationData ? (
          <ApplicationCard
            data={applicationData}
            isMyMessage={isMyMessage}
            isBrandUser={isBrandUser}
            onAccept={onApplicationAccept}
            onReject={onApplicationReject}
          />
        ) : isPaymentRequest ? (
          <PaymentRequestCard
            messageMetadata={(message.metadata || {}) as Record<string, unknown>}
            roomDetail={roomDetail}
            isMyMessage={isMyMessage}
            onPaymentClick={onPaymentClick}
          />
        ) : isSystem ? (
          <SystemMessage>{message.content}</SystemMessage>
        ) : (
          <MessageBubble $variant={isMyMessage ? 'sent' : 'received'}>
            {message.content}
          </MessageBubble>
        )}
        <MessageMeta>
          <MessageTime>{formatTimestamp(message.createdAt)}</MessageTime>
          {isMyMessage && roomDetail?.room.unreadCount === 0 && (
            <MessageStatus>읽음</MessageStatus>
          )}
        </MessageMeta>
      </MessageGroupContainer>
    </React.Fragment>
  );
};

const MessageGroupContainer = styled.div<{ $align: 'start' | 'end' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === 'end' ? 'flex-end' : 'flex-start')};
  gap: 4px;
`;

const MessageBubble = styled.div<{ $variant: 'sent' | 'received' }>`
  background: ${({ $variant }) => ($variant === 'sent' ? '#687CF4' : '#FFFFFF')};
  color: ${({ $variant }) => ($variant === 'sent' ? '#FFFFFF' : '#030213')};
  padding: 12px 16px;
  border-radius: 10px;
  border: ${({ $variant }) => ($variant === 'sent' ? 'none' : '1px solid rgba(0, 0, 0, 0.1)')};
  max-width: 90%;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.5;
  word-wrap: break-word;
  word-break: break-word;
`;

const MessageTime = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: #717182;
`;

const MessageMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MessageStatus = styled.span`
  font-size: 0.75rem;
  color: #5a64ff;
  font-weight: 600;
`;

const SystemMessage = styled.div`
  font-size: 0.85rem;
  color: #7d8299;
  background: #f4f5fb;
  border-radius: 999px;
  padding: 6px 14px;
`;

const DateDivider = styled.div`
  align-self: center;
  font-size: 0.75rem;
  color: #7d8299;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(125, 130, 153, 0.12);
`;

export default MessageGroup;

