import React, { useMemo } from 'react';
import { RefreshCcw } from 'lucide-react';
import type { ChatRoomSummary } from '@/domain/entities/Chat';
import { MessageItemSkeleton } from './MessageItemSkeleton';
import { MessageItem } from './MessageItem';
import { formatTimestamp, getCounterpart } from '../utils/messageUtils';
import { EmptyState, RetryButton } from '../styled/MessagesPageStyles';

interface MessageListContentProps {
  rooms: ChatRoomSummary[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  onMessageClick: (roomId: string, event?: React.MouseEvent) => void;
  onDeleteClick: (roomId: string, event: React.MouseEvent) => void;
}

export const MessageListContent: React.FC<MessageListContentProps> = React.memo(
  ({ rooms, loading, error, onRefresh, onMessageClick, onDeleteClick }) => {
    return useMemo(() => {
      if (loading) {
        return <MessageItemSkeleton count={4} />;
      }

      if (error) {
        return (
          <EmptyState>
            {error}
            <br />
            <RetryButton type="button" onClick={onRefresh}>
              <RefreshCcw size={16} />
              다시 시도
            </RetryButton>
          </EmptyState>
        );
      }

      if (rooms.length === 0) {
        return (
          <EmptyState>
            아직 대화중인 상대가 없습니다.
            <br />
            <button type="button" onClick={onRefresh} style={{ marginTop: 12 }}>
              새로 고침
            </button>
          </EmptyState>
        );
      }

      return rooms.map((room) => {
        const counterpart = getCounterpart(room);
        const displayName = counterpart?.name || counterpart?.nickname || '알 수 없는 사용자';
        const avatarUrl =
          counterpart?.avatarUrl ||
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80';
        const previewText = room.lastMessage?.content || '메시지가 없습니다.';
        const timestamp = formatTimestamp(room.lastMessage?.createdAt ?? room.updatedAt);

        return (
          <MessageItem
            key={room.roomId}
            room={room}
            counterpart={counterpart}
            displayName={displayName}
            avatarUrl={avatarUrl}
            previewText={previewText}
            timestamp={timestamp}
            onMessageClick={onMessageClick}
            onDeleteClick={onDeleteClick}
          />
        );
      });
    }, [rooms, loading, error, onRefresh, onMessageClick, onDeleteClick]);
  }
);

MessageListContent.displayName = 'MessageListContent';

