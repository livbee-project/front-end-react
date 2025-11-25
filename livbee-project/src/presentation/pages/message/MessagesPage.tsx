import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RefreshCcw, MessageCircle, Search as SearchIcon, Filter } from 'lucide-react';
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
  gap: 2px;
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

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f1f25;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #7b7f92;
  font-size: 0.9rem;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: ${({ $variant }) => ($variant === 'secondary' ? '1px solid #dfe3f3' : 'none')};
  background: ${({ $variant }) => ($variant === 'secondary' ? '#fff' : '#5a64ff')};
  color: ${({ $variant }) => ($variant === 'secondary' ? '#434659' : '#fff')};
  padding: 10px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  box-shadow: ${({ $variant }) =>
    $variant === 'secondary' ? 'none' : '0 12px 20px rgba(90, 100, 255, 0.25)'};
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

const SearchInputWrapper = styled.div`
  flex: 1;
  min-width: 240px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e3e5f0;
  border-radius: 999px;
  padding: 10px 16px;
  background: #fff;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  font-size: 0.9rem;
  background: transparent;
  color: #1f1f25;
  outline: none;
`;

const FilterButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  border: 1px solid #e3e5f0;
  background: #fff;
  padding: 10px 14px;
  color: #434659;
  font-size: 0.85rem;
`;

const StatsBar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
`;

const StatCard = styled.div`
  border-radius: 16px;
  border: 1px solid #eef1ff;
  background: #f9f9ff;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatLabel = styled.span`
  font-size: 0.85rem;
  color: #7b7f92;
`;

const StatValue = styled.span`
  font-size: 1.2rem;
  font-weight: 700;
  color: #1f1f25;
`;

const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  border: 1px dashed #dfe3f3;
  border-radius: 16px;
  color: #7b7f92;
  background: #fff;
`;

const SkeletonItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid #f4f5fb;
  animation: pulse 1.4s ease infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const SkeletonAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #eceff7;
`;

const SkeletonTextGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonLine = styled.div<{ $width?: string }>`
  height: 12px;
  border-radius: 999px;
  background: #eceff7;
  width: ${({ $width }) => $width || '100%'};
`;

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { rooms, loading, error, refresh } = useChatRooms();
  const [keyword, setKeyword] = useState('');

  const formatTimestamp = (iso?: string) => {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) return `${minutes || 1}분 전`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}시간 전`;
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
    return room.brandUser ?? room.showhostUser;
  };

  const getRoleLabel = (role?: string) => {
    if (role === 'brand') return '브랜드';
    if (role === 'showhost') return '쇼호스트';
    return '참여자';
  };

  const filteredRooms = useMemo(() => {
    const term = keyword.trim().toLowerCase();
    if (!term) return rooms;
    return rooms.filter((room) => {
      const counterpart = getCounterpart(room);
      const name = (counterpart?.name || counterpart?.nickname || '').toLowerCase();
      const campaign = room.campaign?.title?.toLowerCase() || '';
      return name.includes(term) || campaign.includes(term);
    });
  }, [rooms, keyword]);

  const activeRoomCount = filteredRooms.filter((room) => room.unreadCount > 0).length;
  const brandCount = filteredRooms.filter((room) => room.brandUser).length;
  const showhostCount = filteredRooms.filter((room) => room.showhostUser).length;

  const handleMessageClick = (roomId: string) => {
    navigate(`/chat/${roomId}`);
  };

  const renderList = () => {
    if (loading) {
      return (
        <>
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonItem key={`skeleton-${index}`}>
              <SkeletonAvatar />
              <SkeletonTextGroup>
                <SkeletonLine $width="40%" />
                <SkeletonLine />
                <SkeletonLine $width="70%" />
              </SkeletonTextGroup>
            </SkeletonItem>
          ))}
        </>
      );
    }

    if (error) {
      return (
        <EmptyState>
          {error}
          <br />
          <IconButton type="button" $variant="secondary" onClick={refresh} style={{ marginTop: 12 }}>
            <RefreshCcw size={16} />
            다시 시도
          </IconButton>
        </EmptyState>
      );
    }

    if (filteredRooms.length === 0) {
      return (
        <EmptyState>
          {keyword ? (
            <>
              검색어와 일치하는 대화가 없습니다.
              <br />
              <button type="button" onClick={() => setKeyword('')}>
                검색어 초기화
              </button>
            </>
          ) : (
            '아직 대화중인 상대가 없습니다.'
          )}
        </EmptyState>
      );
    }

    return filteredRooms.map((room) => {
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
              {room.campaign?.title && (
                <RoleTag style={{ background: '#eef1ff', color: '#5a64ff' }}>
                  {room.campaign.title}
                </RoleTag>
              )}
              {room.unreadCount > 0 && <UnreadBadge>{room.unreadCount}</UnreadBadge>}
            </TagAndBadge>
          </MessageContent>
        </MessageItem>
      );
    });
  };

  return (
    <PageContainer>
      <PageHeader>
        <TitleGroup>
          <Title>메시지</Title>
          <Subtitle>브랜드 담당자와 쇼호스트 간의 모든 대화 기록을 확인하세요.</Subtitle>
        </TitleGroup>
        <HeaderActions>
          <IconButton type="button" $variant="secondary" onClick={refresh}>
            <RefreshCcw size={16} />
            새로고침
          </IconButton>
          <IconButton type="button" onClick={() => navigate('/campaigns')}>
            <MessageCircle size={16} />
            새 대화
          </IconButton>
        </HeaderActions>
      </PageHeader>

      <StatsBar>
        <StatCard>
          <StatLabel>전체 대화</StatLabel>
          <StatValue>{filteredRooms.length}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>읽지 않은 대화</StatLabel>
          <StatValue>{activeRoomCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>브랜드 담당자</StatLabel>
          <StatValue>{brandCount}</StatValue>
        </StatCard>
        <StatCard>
          <StatLabel>쇼호스트</StatLabel>
          <StatValue>{showhostCount}</StatValue>
        </StatCard>
      </StatsBar>

      <SearchBar>
        <SearchInputWrapper>
          <SearchIcon size={16} color="#a3a7bb" />
          <SearchInput
            value={keyword}
            placeholder="이름, 캠페인 제목으로 검색"
            onChange={(event) => setKeyword(event.target.value)}
          />
        </SearchInputWrapper>
        <FilterButton type="button">
          <Filter size={16} />
          필터
        </FilterButton>
      </SearchBar>

      <MessageList>{renderList()}</MessageList>
    </PageContainer>
  );
};

export default MessagesPage;

