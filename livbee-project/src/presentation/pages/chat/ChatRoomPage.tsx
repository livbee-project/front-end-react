import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useChatRoomDetail } from '@/presentation/hooks/useChatRoomDetail';

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
  const { roomDetail, messages, loading, error, sendMessage, markAsRead } =
    useChatRoomDetail(activeRoomId);
  const [composer, setComposer] = useState('');
  const [sendError, setSendError] = useState<string | null>(null);

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

  const counterpart = useMemo(() => {
    if (!roomDetail) return undefined;
    const myId = roomDetail.room.me.userId;
    if (roomDetail.room.brandUser && roomDetail.room.brandUser.id !== myId) {
      return roomDetail.room.brandUser;
    }
    if (roomDetail.room.showhostUser && roomDetail.room.showhostUser.id !== myId) {
      return roomDetail.room.showhostUser;
    }
    return roomDetail.room.brandUser ?? roomDetail.room.showhostUser;
  }, [roomDetail]);

  const displayCampaign =
    roomDetail?.room.campaign?.title ?? fallbackState.campaignTitle ?? '캠페인 정보 없음';
  const displayCounterpart =
    counterpart?.name || counterpart?.nickname || fallbackState.portfolioTitle || '대화상대';

  const handleSend = async () => {
    if (!composer.trim() || !activeRoomId) return;
    try {
      setSendError(null);
      await sendMessage({ content: composer.trim(), messageType: 'text' });
      setComposer('');
    } catch (err) {
      setSendError(err instanceof Error ? err.message : '메시지를 전송하지 못했습니다.');
    }
  };

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

  if (!activeRoomId) {
    return (
      <PageWrapper>
        <MessageValue>채팅방 정보가 없습니다. 메시지 목록에서 대화를 선택해주세요.</MessageValue>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ChatColumn>
        <FixedPanel>
          <ContactHeader>
            <ProfileGroup>
              <BackButton onClick={() => navigate(-1)} aria-label="이전 페이지로 이동">
                <ChevronLeft size={18} />
              </BackButton>
              <AvatarWrapper>
                <Avatar
                  src={
                    counterpart?.avatarUrl ||
                    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80'
                  }
                  alt={displayCounterpart}
                />
                <StatusDot />
              </AvatarWrapper>
              <div>
                <HeaderName>{displayCounterpart}</HeaderName>
                <HeaderRole>{counterpart?.role === 'brand' ? '브랜드' : '쇼호스트'}</HeaderRole>
              </div>
            </ProfileGroup>
            <ContractButton>{displayCampaign}</ContractButton>
          </ContactHeader>
        </FixedPanel>

        <ScrollArea>
          <ChatCard>
            {loading && <MessageValue>채팅을 불러오는 중입니다...</MessageValue>}
            {error && <MessageValue>{error}</MessageValue>}
            {!loading && !error && messages.length === 0 && (
              <MessageValue>아직 주고받은 메시지가 없습니다.</MessageValue>
            )}
            <Messages>
              {messages.map((chatMessage) => {
                const isMyMessage = chatMessage.senderId === roomDetail?.room.me.userId;
                return (
                  <MessageGroup key={chatMessage.id} $align={isMyMessage ? 'end' : 'start'}>
                    <MessageBubble $variant={isMyMessage ? 'sent' : 'received'}>
                      {chatMessage.content}
                    </MessageBubble>
                    <MessageTime>{formatTimestamp(chatMessage.createdAt)}</MessageTime>
                  </MessageGroup>
                );
              })}
            </Messages>
          </ChatCard>
        </ScrollArea>
      </ChatColumn>

      <ComposerBar>
        <ComposerInner>
          <InputField
            placeholder="메시지를 입력하세요"
            value={composer}
            onChange={(event) => setComposer(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                event.preventDefault();
                handleSend();
              }
            }}
            disabled={loading || Boolean(error)}
          />
          <SendButton
            type="button"
            aria-label="메시지 전송"
            onClick={handleSend}
            disabled={loading || Boolean(error) || !composer.trim()}
          >
            ➤
          </SendButton>
        </ComposerInner>
        {sendError && <SendError>{sendError}</SendError>}
      </ComposerBar>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 24px 16px 120px;
  background: #f4f5fb;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ChatColumn = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const FixedPanel = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 112px;
  z-index: 50;
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  padding: 8px 16px;
  box-sizing: border-box;
`;

const ScrollArea = styled.div`
  padding-top: 60px;
  padding-bottom: 150px;
  overflow-y: auto;
  max-height: calc(100vh - 112px - 60px - 72px);
`;

const ContactHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 4px;
`;

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #eceff7;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1b1c2e;
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const ChatCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: transparent;
`;

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const StatusDot = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3cd25a;
  border: 2px solid #fff;
`;

const HeaderName = styled.div`
  font-weight: 700;
  color: #1f1f25;
`;

const HeaderRole = styled.div`
  font-size: 0.8rem;
  color: #7d8299;
`;

const ContractButton = styled.button`
  border: none;
  background: #6c6bff;
  color: #fff;
  padding: 10px 22px;
  border-radius: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 12px 24px rgba(90, 100, 255, 0.35);

  &::before {
    content: '📄';
  }
`;

const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const MessageGroup = styled.div<{ $align: 'start' | 'end' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === 'end' ? 'flex-end' : 'flex-start')};
  gap: 4px;
`;

const MessageBubble = styled.div<{ $variant: 'sent' | 'received' }>`
  background: ${({ $variant }) => ($variant === 'sent' ? '#5a64ff' : '#f1f2f9')};
  color: ${({ $variant }) => ($variant === 'sent' ? '#fff' : '#1f1f25')};
  padding: 10px 14px;
  border-radius: ${({ $variant }) => ($variant === 'sent' ? '16px 16px 4px 16px' : '16px 16px 16px 4px')};
  max-width: 90%;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const MessageTime = styled.span`
  font-size: 0.75rem;
  color: #a0a4b7;
`;

const MessageValue = styled.div`
  padding: 10px 12px;
  border-radius: 12px;
  background: #f5f6fc;
  color: #434659;
  margin: 8px 0;
`;

const InputField = styled.input`
  flex: 1;
  border-radius: 999px;
  border: 1px solid #dfe3f3;
  padding: 12px 18px;
  font-size: 0.95rem;
  background: #fff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const SendButton = styled.button`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  border: none;
  background: #5a64ff;
  color: #fff;
  font-size: 1rem;
  box-shadow: 0 10px 22px rgba(90, 100, 255, 0.35);
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const ComposerBar = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 56px;
  z-index: 60;
  width: 100%;
  max-width: 1200px;
  padding: 12px 16px;
  background: #ffffff;
  border-top: 1px solid #e1e4f2;
  box-sizing: border-box;
`;

const ComposerInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SendError = styled.p`
  margin-top: 8px;
  color: #e64444;
`;

export default ChatRoomPage;


