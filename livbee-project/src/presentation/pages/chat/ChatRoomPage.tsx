import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, FileText, ChevronLeft } from 'lucide-react';

interface ChatRoomState {
  campaignTitle?: string;
  portfolioTitle?: string;
  message?: string;
  availableDate?: string;
  availableTime?: string;
}

const ChatRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as ChatRoomState;

  const campaignTitle = state.campaignTitle ?? '코트니엘 겨울맞이 쇼핑라이브';
  const portfolioTitle = state.portfolioTitle ?? '패션 쇼핑라이브 포트폴리오';
  const message = state.message && state.message.trim().length > 0 ? state.message.trim() : 'dd';
  const availableDate = state.availableDate ? state.availableDate.replace(/-/g, '. ') : '2025. 11. 29';
  const availableTime = state.availableTime ?? '22:57';

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
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=60"
                  alt="쇼호스트 프로필"
                />
                <StatusDot />
              </AvatarWrapper>
              <div>
                <HeaderName>{portfolioTitle}</HeaderName>
                <HeaderRole>쇼호스트</HeaderRole>
              </div>
            </ProfileGroup>
            <ContractButton>계약 보내기</ContractButton>
          </ContactHeader>
        </FixedPanel>

        <ScrollArea>
          <ChatCard>
          <Messages>
            <MessageGroup $align="start">
              <MessageBubble $variant="received">
                안녕하세요! 이번 패션 라이브 캠페인에 관심 가져주셔서 감사합니다.
              </MessageBubble>
              <MessageTime>오후 2:15</MessageTime>
            </MessageGroup>

            <MessageGroup $align="start">
              <MessageBubble $variant="received">3월 25일 오후 2시에 촬영 가능하실까요?</MessageBubble>
              <MessageTime>오후 2:16</MessageTime>
            </MessageGroup>

            <MessageGroup $align="end">
              <MessageBubble $variant="sent">안녕하세요! 문의 주셔서 감사합니다.</MessageBubble>
              <MessageTime>오후 3:20</MessageTime>
            </MessageGroup>

            <MessageGroup $align="end">
              <MessageBubble $variant="sent">네, 해당 시간에 촬영 가능합니다!</MessageBubble>
              <MessageTime>오후 3:24</MessageTime>
            </MessageGroup>

            <MessageGroup $align="start">
              <ApplicationCard>
                <ApplicationHeader>
                  <ApplicationAvatar>👤</ApplicationAvatar>
                  <div>
                    <ApplicationTitle>지원서</ApplicationTitle>
                    <ApplicationSubtitle>지원서 ID #23415</ApplicationSubtitle>
                  </div>
                </ApplicationHeader>

                <ApplicationBody>
                  <ApplicationField>
                    <FieldLabel>캠페인</FieldLabel>
                    <FieldValue>{campaignTitle}</FieldValue>
                  </ApplicationField>
                  <ApplicationField>
                    <FieldLabel>포트폴리오</FieldLabel>
                    <PortfolioValue>
                      <FileText size={16} />
                      {portfolioTitle}
                    </PortfolioValue>
                  </ApplicationField>
                  <ApplicationField>
                    <FieldLabel>가능 일정</FieldLabel>
                    <ScheduleChips>
                      <ScheduleChip>
                        <Calendar size={16} />
                        {availableDate}
                      </ScheduleChip>
                      <ScheduleChip>
                        <Clock size={16} />
                        {availableTime}
                      </ScheduleChip>
                    </ScheduleChips>
                  </ApplicationField>
                  <ApplicationField>
                    <FieldLabel>메시지</FieldLabel>
                    <MessageValue>{message}</MessageValue>
                  </ApplicationField>
                </ApplicationBody>

                <ApplicationActions>
                  <ActionButton $variant="secondary">
                    <span>✕</span> 거절
                  </ActionButton>
                  <ActionButton $variant="primary">
                    <span>✓</span> 수락
                  </ActionButton>
                </ApplicationActions>
              </ApplicationCard>
              <MessageTime>오후 5:34</MessageTime>
            </MessageGroup>
          </Messages>

          </ChatCard>
        </ScrollArea>
      </ChatColumn>

      <ComposerBar>
        <ComposerInner>
          <InputField placeholder="메시지를 입력하세요" />
          <SendButton aria-label="메시지 전송">➤</SendButton>
        </ComposerInner>
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
  position: sticky;
  top: 110px;
  z-index: 50;
  background: #f4f5fb;
  padding-bottom: 8px;
`;

const ScrollArea = styled.div`
  margin-top: 8px;
  padding-bottom: 150px;
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

const ApplicationCard = styled.div`
  background: #fff;
  border-radius: 20px;
  border: 1px solid #eceff7;
  box-shadow: 0 8px 24px rgba(125, 130, 166, 0.15);
  padding: 18px;
  width: 100%;
`;

const ApplicationHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const ApplicationAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #edf0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ApplicationTitle = styled.div`
  font-weight: 700;
`;

const ApplicationSubtitle = styled.div`
  font-size: 0.8rem;
  color: #9297af;
`;

const ApplicationBody = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ApplicationField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.span`
  font-size: 0.8rem;
  color: #a0a4b7;
  font-weight: 600;
`;

const FieldValue = styled.span`
  font-size: 0.95rem;
  color: #1f1f25;
`;

const PortfolioValue = styled(FieldValue)`
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #5a64ff;
  }
`;

const ScheduleChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ScheduleChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: #f4f5ff;
  color: #5a64ff;
  font-size: 0.85rem;
`;

const MessageValue = styled(FieldValue)`
  padding: 10px 12px;
  border-radius: 12px;
  background: #f5f6fc;
  color: #434659;
`;

const ApplicationActions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 14px;
`;

const ActionButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  border-radius: 12px;
  border: ${({ $variant }) => ($variant === 'primary' ? '1px solid #5a64ff' : '1px solid #dee2f0')};
  background: ${({ $variant }) => ($variant === 'primary' ? '#5a64ff' : '#fff')};
  color: ${({ $variant }) => ($variant === 'primary' ? '#fff' : '#1f1f25')};
  font-weight: 600;
  padding: 10px;
  display: flex;
  justify-content: center;
  gap: 6px;
  align-items: center;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid #f0f2f8;
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
`;

const ComposerBar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 56px;
  z-index: 60;
  padding: 12px 16px;
  background: #f4f5fb;
  border-top: 1px solid #e1e4f2;
`;

const ComposerInner = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default ChatRoomPage;


