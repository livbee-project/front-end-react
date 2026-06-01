import React from 'react';
import styled from 'styled-components';
import { Calendar, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { formatApplicationDate, formatApplicationTime } from '@/shared/utils/chatUtils';
import type { ChatRoomDetail } from '@/domain/entities/Chat';

interface PaymentRequestCardProps {
  messageMetadata: Record<string, unknown>;
  roomDetail?: ChatRoomDetail;
  isMyMessage: boolean;
  onPaymentClick: () => void;
}

const PaymentRequestCard: React.FC<PaymentRequestCardProps> = ({
  messageMetadata,
  roomDetail,
  isMyMessage,
  onPaymentClick,
}) => {
  const getString = (value: unknown): string | undefined => (typeof value === 'string' ? value : undefined);
  const getNumber = (value: unknown): number | undefined => (typeof value === 'number' ? value : undefined);

  const campaignTitle =
    getString(messageMetadata.campaignTitle) ||
    roomDetail?.room.campaign?.title ||
    '정보 없음';
  const brandName = roomDetail?.room.campaign?.brandName || '정보 없음';
  const availableDate = getString(messageMetadata.availableDate);
  const availableTime = getString(messageMetadata.availableTime);
  const amount = getNumber(messageMetadata.amount);

  return (
    <PaymentRequestCardWrapper $align={isMyMessage ? 'end' : 'start'}>
      <PaymentRequestBanner>
        지원서가 수락되었습니다. 결제를 진행해주세요.
      </PaymentRequestBanner>
      <Card>
        <PaymentRequestHeader>
          <DollarSign size={18} />
          결제 요청
        </PaymentRequestHeader>
        <PaymentRequestContent>
          <PaymentRequestSection>
            <PaymentRequestLabel>캠페인</PaymentRequestLabel>
            <PaymentRequestCampaignName>{brandName}</PaymentRequestCampaignName>
            <PaymentRequestCampaignTitle>{campaignTitle}</PaymentRequestCampaignTitle>
          </PaymentRequestSection>
          <PaymentRequestDivider />
          <PaymentRequestSection>
            <PaymentRequestLabel>촬영 일정</PaymentRequestLabel>
            <PaymentRequestSchedule>
              <ScheduleItem>
                <Calendar size={16} />
                <span>{formatApplicationDate(availableDate)}</span>
              </ScheduleItem>
              <ScheduleItem>
                <Clock size={16} />
                <span>{formatApplicationTime(availableTime)}</span>
              </ScheduleItem>
            </PaymentRequestSchedule>
          </PaymentRequestSection>
          <PaymentRequestAmountBox>
            <PaymentRequestAmountLabel>결제 금액</PaymentRequestAmountLabel>
            <PaymentRequestAmount>
              {amount && amount > 0 ? `${amount.toLocaleString()}원` : '정보 없음'}
            </PaymentRequestAmount>
          </PaymentRequestAmountBox>
          <PaymentRequestButton onClick={onPaymentClick}>
            결제하기 <ArrowRight size={16} />
          </PaymentRequestButton>
        </PaymentRequestContent>
      </Card>
    </PaymentRequestCardWrapper>
  );
};

const PaymentRequestCardWrapper = styled.div<{ $align: 'start' | 'end' }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: ${({ $align }) => ($align === 'end' ? 'flex-end' : 'flex-start')};
  gap: 8px;
  max-width: 90%;
`;

const PaymentRequestBanner = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  text-align: center;
  width: 100%;
`;

const Card = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 4px 12px rgba(20, 24, 46, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PaymentRequestHeader = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  font: ${({ theme }) => theme.fonts.p1};
  font-weight: 600;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const PaymentRequestContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PaymentRequestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PaymentRequestLabel = styled.span`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;
`;

const PaymentRequestCampaignName = styled.div`
  font: ${({ theme }) => theme.fonts.p1};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const PaymentRequestCampaignTitle = styled.div`
  font: ${({ theme }) => theme.fonts.p2};
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.4;
`;

const PaymentRequestDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const PaymentRequestSchedule = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  font: ${({ theme }) => theme.fonts.p1};
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

const PaymentRequestAmountBox = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PaymentRequestAmountLabel = styled.span`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;
`;

const PaymentRequestAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const PaymentRequestButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 14px 20px;
  font: ${({ theme }) => theme.fonts.p1};
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:active {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export default PaymentRequestCard;

