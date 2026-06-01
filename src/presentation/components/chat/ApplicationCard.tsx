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
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 0;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 4px 12px rgba(20, 24, 46, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ApplicationHeader = styled.div<{ $isMyMessage: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ $isMyMessage, theme }) =>
    $isMyMessage ? theme.colors.primary : theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => `${theme.radii.lg} ${theme.radii.lg} 0 0`};
`;

const ApplicationBadge = styled.div<{ $isMyMessage?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font: ${({ theme }) => theme.fonts.p2};
  font-weight: 600;
  color: ${({ $isMyMessage, theme }) =>
    $isMyMessage ? theme.colors.primaryForeground : theme.colors.muted};

  svg {
    color: inherit;
  }
`;

const ApplicationStatus = styled.span<{ $status?: string; $isMyMessage?: boolean }>`
  font: ${({ theme }) => theme.fonts.caption};
  font-weight: 600;
  color: ${({ $status, $isMyMessage, theme }) => {
    if ($isMyMessage) {
      return 'rgba(255, 255, 255, 0.9)';
    }
    if ($status === 'accepted') return theme.colors.primary;
    if ($status === 'rejected') return theme.colors.error;
    return theme.colors.muted;
  }};
`;

const ApplicationContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ApplicationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ApplicationSectionLabel = styled.span`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
`;

const ApplicationSectionValue = styled.span`
  font: ${({ theme }) => theme.fonts.p1};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
`;

const ApplicationSchedule = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font: ${({ theme }) => theme.fonts.p2};
  color: ${({ theme }) => theme.colors.text};
`;

const ScheduleItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: inherit;

  svg {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const ApplicationMessageBox = styled.div`
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.primaryOpacity['15']};
  background: ${({ theme }) => theme.primaryOpacity['10']};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};

  p {
    margin: 0;
    font: ${({ theme }) => theme.fonts.p2};
    line-height: 1.5;
  }

  svg {
    flex-shrink: 0;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ApplicationActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
`;

const ApplicationButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border: ${({ $variant, theme }) =>
    $variant === 'secondary' ? `1px solid ${theme.colors.border}` : 'none'};
  background: ${({ $variant, theme }) =>
    $variant === 'secondary' ? theme.colors.surface : theme.colors.primary};
  color: ${({ $variant, theme }) =>
    $variant === 'secondary' ? theme.colors.text : theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.p1};
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba(15, 27, 69, 0.08);
  }
`;

export default ApplicationCard;

