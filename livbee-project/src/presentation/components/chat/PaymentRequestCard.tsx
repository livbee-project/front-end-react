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
  const campaignTitle = (messageMetadata.campaignTitle as string) || roomDetail?.room.campaign?.title || '정보 없음';
  const brandName = roomDetail?.room.campaign?.brandName || '정보 없음';
  const availableDate = messageMetadata.availableDate as string | null | undefined;
  const availableTime = messageMetadata.availableTime as string | null | undefined;
  const amount = messageMetadata.amount as number | undefined;

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
  background: #f4f5fb;
  color: #434659;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13px;
  text-align: center;
  width: 100%;
`;

const Card = styled.div`
  width: 100%;
  border: 1px solid #eceff7;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(20, 24, 46, 0.06);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const PaymentRequestHeader = styled.div`
  background: #687CF4;
  color: #ffffff;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
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
  gap: 16px;
`;

const PaymentRequestSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PaymentRequestLabel = styled.span`
  font-size: 12px;
  color: #a0a1b2;
  font-weight: 500;
`;

const PaymentRequestCampaignName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #0f0f17;
`;

const PaymentRequestCampaignTitle = styled.div`
  font-size: 13px;
  color: #7d8299;
  line-height: 1.4;
`;

const PaymentRequestDivider = styled.div`
  height: 1px;
  background: #eceff7;
  margin: 4px 0;
`;

const PaymentRequestSchedule = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 14px;
  color: #434659;
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

const PaymentRequestAmountBox = styled.div`
  background: #f4f5fb;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PaymentRequestAmountLabel = styled.span`
  font-size: 12px;
  color: #7d8299;
  font-weight: 500;
`;

const PaymentRequestAmount = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #687CF4;
`;

const PaymentRequestButton = styled.button`
  width: 100%;
  background: #687CF4;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s;

  &:hover {
    background: #5a6ae8;
  }

  &:active {
    background: #4d5cdb;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

export default PaymentRequestCard;

