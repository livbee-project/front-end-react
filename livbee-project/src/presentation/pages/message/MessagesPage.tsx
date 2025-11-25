import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useChatRooms } from '@/presentation/hooks/useChatRooms';
import type { ChatRoomSummary } from '@/domain/entities/Chat';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  padding-bottom: 80px;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #f4f5fb;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #fafbfc;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const StatusDot = styled.span<{ $isOnline: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  background: ${({ $isOnline }) => ($isOnline ? '#3cd25a' : '#d1d5db')};
`;

const MessageContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const Name = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: #1f1f25;
`;

const Timestamp = styled.div`
  font-size: 0.75rem;
  color: #9297af;
  flex-shrink: 0;
`;

const MessageText = styled.div`
  font-size: 0.875rem;
  color: #434659;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TagAndBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RoleTag = styled.span`
  padding: 2px 8px;
  border-radius: 10px;
  background: #f4f5fb;
  color: #9297af;
  font-size: 0.7rem;
  font-weight: 500;
`;

const UnreadBadge = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #5a64ff;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { rooms, loading, error, refresh } = useChatRooms();

  const formatTimestamp = (iso?: string) => {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getCounterpart = (room: ChatRoomSummary) => {
    const myId = room.me.userId;
    if (room.brandUser && room.brandUser.id !== myId) {
      return room.brandUser;
    }
    if (room.showhostUser && room.showhostUser.id !== myId) {
      return room.showhostUser;
    }
    // fallback
    return room.brandUser ?? room.showhostUser;
  };

  const getRoleLabel = (role?: string) => {
    if (role === 'brand') return '브랜드';
    if (role === 'showhost') return '쇼호스트';
    return '참여자';
  };

  const handleMessageClick = (roomId: string) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <PageContainer>
      {loading && <MessageText>메시지 목록을 불러오는 중입니다...</MessageText>}
      {error && (
        <MessageText>
          {error}{' '}
          <button type="button" onClick={refresh}>
            다시 시도
          </button>
        </MessageText>
      )}
      {!loading && !error && rooms.length === 0 && (
        <MessageText>아직 대화중인 상대가 없습니다.</MessageText>
      )}
      <MessageList>
        {rooms.map((room) => {
          const counterpart = getCounterpart(room);
          const displayName = counterpart?.name || counterpart?.nickname || '알 수 없는 사용자';
          const avatarUrl =
            counterpart?.avatarUrl ||
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80';
          const previewText = room.lastMessage?.content || '메시지가 없습니다.';
          const timestamp = formatTimestamp(room.lastMessage?.createdAt ?? room.updatedAt);
          return (
            <MessageItem key={room.roomId} onClick={() => handleMessageClick(room.roomId)}>
              <AvatarContainer>
                <Avatar src={avatarUrl} alt={displayName} />
                <StatusDot $isOnline={false} />
              </AvatarContainer>
              <MessageContent>
                <MessageHeader>
                  <Name>{displayName}</Name>
                  <Timestamp>{timestamp}</Timestamp>
                </MessageHeader>
                <MessageText>{previewText}</MessageText>
                <TagAndBadge>
                  <RoleTag>{getRoleLabel(counterpart?.role)}</RoleTag>
                  {room.unreadCount > 0 && <UnreadBadge>{room.unreadCount}</UnreadBadge>}
                </TagAndBadge>
              </MessageContent>
            </MessageItem>
          );
        })}
      </MessageList>
    </PageContainer>
  );
};

export default MessagesPage;

