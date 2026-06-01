import React from 'react';
import { Trash2 } from 'lucide-react';
import type { ChatRoomSummary } from '@/domain/entities/Chat';
import {
  MessageItemWrapper,
  MessageItemContent,
  AvatarContainer,
  Avatar,
  MessageContent,
  MessageHeader,
  Name,
  Timestamp,
  MessageText,
  DeleteButton,
} from '@/presentation/pages/message/styled/MessagesPageStyles';

interface MessageItemProps {
  room: ChatRoomSummary;
  counterpart: { name?: string; nickname?: string; avatarUrl?: string } | null;
  displayName: string;
  avatarUrl: string;
  previewText: string;
  timestamp: string;
  onMessageClick: (roomId: string, event?: React.MouseEvent) => void;
  onDeleteClick: (roomId: string, event: React.MouseEvent) => void;
}

export const MessageItem: React.FC<MessageItemProps> = ({
  room,
  displayName,
  avatarUrl,
  previewText,
  timestamp,
  onMessageClick,
  onDeleteClick,
}) => {
  return (
    <MessageItemWrapper>
      <MessageItemContent onClick={(e) => onMessageClick(room.roomId, e)}>
        <AvatarContainer>
          <Avatar src={avatarUrl} alt={displayName} loading="lazy" decoding="async" />
        </AvatarContainer>
        <MessageContent>
          <MessageHeader>
            <Name>{displayName}</Name>
            <Timestamp>{timestamp}</Timestamp>
          </MessageHeader>
          <MessageText>{previewText}</MessageText>
        </MessageContent>
      </MessageItemContent>
      <DeleteButton
        type="button"
        onClick={(e) => onDeleteClick(room.roomId, e)}
        aria-label="채팅방 삭제"
      >
        <Trash2 size={18} />
      </DeleteButton>
    </MessageItemWrapper>
  );
};

