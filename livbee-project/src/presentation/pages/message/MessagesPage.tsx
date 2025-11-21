import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

interface Message {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  avatarUrl: string;
  isOnline: boolean;
  unreadCount?: number;
}

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();

  // 하드코딩된 메시지 데이터
  const mockMessages: Message[] = [
    {
      id: '1',
      name: '김지현',
      message: '네, 해당 시간에 촬영 가능합니다!',
      timestamp: '오후 3:24',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
      isOnline: true,
      unreadCount: 2,
    },
    {
      id: '2',
      name: '이수진',
      message: '포트폴리오 자료 전달드립니다.',
      timestamp: '오후 1:42',
      avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
      isOnline: false,
    },
    {
      id: '3',
      name: '박서연',
      message: '촬영 장소는 어디인가요?',
      timestamp: '어제',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      isOnline: false,
      unreadCount: 1,
    },
    {
      id: '4',
      name: '최민지',
      message: '감사합니다!',
      timestamp: '2024.03.15',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
      isOnline: true,
    },
    {
      id: '5',
      name: '정다은',
      message: '네, 알겠습니다.',
      timestamp: '2024.03.14',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80',
      isOnline: false,
    },
  ];

  const handleMessageClick = (messageId: string) => {
    navigate(`/chat`, { state: { messageId } });
  };

  return (
    <PageContainer>
      <MessageList>
        {mockMessages.map((message) => (
          <MessageItem key={message.id} onClick={() => handleMessageClick(message.id)}>
            <AvatarContainer>
              <Avatar src={message.avatarUrl} alt={message.name} />
              <StatusDot $isOnline={message.isOnline} />
            </AvatarContainer>
            <MessageContent>
              <MessageHeader>
                <Name>{message.name}</Name>
                <Timestamp>{message.timestamp}</Timestamp>
              </MessageHeader>
              <MessageText>{message.message}</MessageText>
              <TagAndBadge>
                <RoleTag>쇼호스트</RoleTag>
                {message.unreadCount && message.unreadCount > 0 && (
                  <UnreadBadge>{message.unreadCount}</UnreadBadge>
                )}
              </TagAndBadge>
            </MessageContent>
          </MessageItem>
        ))}
      </MessageList>
    </PageContainer>
  );
};

export default MessagesPage;

