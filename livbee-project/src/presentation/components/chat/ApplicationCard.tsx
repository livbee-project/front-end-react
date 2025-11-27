import React from 'react';
import styled from 'styled-components';
import { Calendar, Clock, FileText, User } from 'lucide-react';
import type { ApplicationCardData } from '@/shared/utils/chatUtils';
import { formatApplicationDate, formatApplicationTime } from '@/shared/utils/chatUtils';

interface ApplicationCardProps {
  data: ApplicationCardData;
  isMyMessage: boolean;
  isBrandUser: boolean;
  onAccept: (applicationId?: string) => void;
  onReject: (applicationId?: string) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
  data,
  isMyMessage,
  isBrandUser,
  onAccept,
  onReject,
}) => {
  return (
    <ApplicationCardWrapper $align={isMyMessage ? 'end' : 'start'}>
      <Card>
        <ApplicationHeader $isMyMessage={isMyMessage}>
          <ApplicationBadge $isMyMessage={isMyMessage}>
            <User size={14} />
            지원서
          </ApplicationBadge>
          {data.status && data.status !== 'pending' && (
            <ApplicationStatus $status={data.status} $isMyMessage={isMyMessage}>
              {data.status === 'accepted'
                ? '수락됨'
                : data.status === 'rejected'
                ? '거절됨'
                : data.status}
            </ApplicationStatus>
          )}
        </ApplicationHeader>
        <ApplicationContent>
          <ApplicationSection>
            <ApplicationSectionLabel>캠페인</ApplicationSectionLabel>
            <ApplicationSectionValue>
              {data.campaignTitle || '정보 없음'}
            </ApplicationSectionValue>
          </ApplicationSection>
          <ApplicationSection>
            <ApplicationSectionLabel>포트폴리오</ApplicationSectionLabel>
            <ApplicationSectionValue>
              {data.portfolioTitle || '정보 없음'}
            </ApplicationSectionValue>
          </ApplicationSection>
          <ApplicationSchedule>
            <ScheduleItem>
              <Calendar size={16} />
              <span>{formatApplicationDate(data.availableDate)}</span>
            </ScheduleItem>
            <ScheduleItem>
              <Clock size={16} />
              <span>{formatApplicationTime(data.availableTime)}</span>
            </ScheduleItem>
          </ApplicationSchedule>
          {data.message && (
            <ApplicationMessageBox>
              <FileText size={16} />
              <p>{data.message}</p>
            </ApplicationMessageBox>
          )}
        </ApplicationContent>
        {isBrandUser && (
          <ApplicationActions>
            <ApplicationButton
              type="button"
              $variant="primary"
              onClick={() => onAccept(data.applicationId)}
            >
              ✓ 수락
            </ApplicationButton>
            <ApplicationButton
              type="button"
              $variant="secondary"
              onClick={() => onReject(data.applicationId)}
            >
              ✕ 거절
            </ApplicationButton>
          </ApplicationActions>
        )}
      </Card>
    </ApplicationCardWrapper>
  );
};

const ApplicationCardWrapper = styled.div<{ $align: 'start' | 'end' }>`
  width: 100%;
  display: flex;
  justify-content: ${({ $align }) => ($align === 'end' ? 'flex-end' : 'flex-start')};
`;

const Card = styled.div`
  width: 100%;
  max-width: 75%;
  border: 1px solid #eceff7;
  border-radius: 16px;
  padding: 0;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(20, 24, 46, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ApplicationHeader = styled.div<{ $isMyMessage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ $isMyMessage }) => ($isMyMessage ? '#687CF4' : '#ffffff')};
  padding: 16px;
  border-radius: 16px 16px 0 0;
`;

const ApplicationBadge = styled.div<{ $isMyMessage?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: ${({ $isMyMessage }) => ($isMyMessage ? '#ffffff' : '#5c5d70')};
  
  svg {
    color: ${({ $isMyMessage }) => ($isMyMessage ? '#ffffff' : '#5c5d70')};
  }
`;

const ApplicationStatus = styled.span<{ $status?: string; $isMyMessage?: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ $status, $isMyMessage }) => {
    if ($isMyMessage) {
      return 'rgba(255, 255, 255, 0.9)';
    }
    if ($status === 'accepted') return '#3c82f6';
    if ($status === 'rejected') return '#ff5c5c';
    return '#a0a1b2';
  }};
`;

const ApplicationContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ApplicationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ApplicationSectionLabel = styled.span`
  font-size: 12px;
  color: #a0a1b2;
`;

const ApplicationSectionValue = styled.span`
  font-size: 14px;
  color: #0f0f17;
  font-weight: 500;
`;

const ApplicationSchedule = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  color: #444556;
`;

const ScheduleItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: inherit;

  svg {
    color: #a0a1b2;
  }
`;

const ApplicationMessageBox = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(104, 124, 244, 0.15);
  background: rgba(104, 124, 244, 0.08);
  padding: 12px;
  display: flex;
  gap: 8px;
  color: #0f0f17;

  p {
    margin: 0;
    font-size: 13px;
    line-height: 1.5;
  }

  svg {
    flex-shrink: 0;
    color: #687cf4;
  }
`;

const ApplicationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px 16px;
`;

const ApplicationButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  border-radius: 10px;
  padding: 12px 0;
  border: ${({ $variant }) => ($variant === 'secondary' ? '1px solid #d8dae8' : 'none')};
  background: ${({ $variant }) => ($variant === 'secondary' ? '#fff' : '#687cf4')};
  color: ${({ $variant }) => ($variant === 'secondary' ? '#3a3b4f' : '#fff')};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(15, 27, 69, 0.08);
  }
`;

export default ApplicationCard;

