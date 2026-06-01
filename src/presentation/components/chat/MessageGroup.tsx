import React from 'react';
import styled from 'styled-components';
import ApplicationCard from '@/presentation/components/chat/ApplicationCard';
import PaymentRequestCard from '@/presentation/components/chat/PaymentRequestCard';
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
  background: ${({ $variant, theme }) =>
    $variant === 'sent' ? theme.colors.primary : theme.colors.surface};
  color: ${({ $variant, theme }) =>
    $variant === 'sent' ? theme.colors.primaryForeground : theme.colors.text};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ $variant, theme }) =>
    $variant === 'sent' ? 'none' : `1px solid ${theme.colors.border}`};
  max-width: 90%;
  font-size: 14px;
  font-weight: 300;
  line-height: 1.5;
  word-wrap: break-word;
  word-break: break-word;
`;

const MessageTime = styled.span`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
`;

const MessageMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MessageStatus = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const SystemMessage = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 6px 14px;
`;

const DateDivider = styled.div`
  align-self: center;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  padding: 6px 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.primaryOpacity['10']};
`;

export default MessageGroup;

