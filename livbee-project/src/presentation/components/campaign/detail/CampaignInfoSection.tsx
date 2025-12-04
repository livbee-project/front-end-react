import React from 'react';
import styled from 'styled-components';
import { Sparkles, CheckCircle2, Camera, Gift, MapPin, CalendarHeart, Clock, PiggyBank } from 'lucide-react';

interface CampaignInfoSectionProps {
  campaignIntro: string;
  qualifications: string[];
  location: string;
  shootDate: string;
  shootTime: string;
  deadline: string;
  fee: string;
  productInfo: string;
}

export const CampaignInfoSection: React.FC<CampaignInfoSectionProps> = ({
  campaignIntro,
  qualifications,
  location,
  shootDate,
  shootTime,
  deadline,
  fee,
  productInfo,
}) => {
  return (
    <DetailContent>
      <Separator />
      <Section>
        <SectionHeader>
          <IconCircle>
            <Sparkles size={20} strokeWidth={2.5} />
          </IconCircle>
          <SectionTitle>캠페인 소개</SectionTitle>
        </SectionHeader>
        <SectionContent>{campaignIntro}</SectionContent>
      </Section>

      <Separator />

      <Section>
        <SectionHeader>
          <IconCircle>
            <CheckCircle2 size={20} strokeWidth={2.5} />
          </IconCircle>
          <SectionTitle>자격요건</SectionTitle>
        </SectionHeader>
        <BulletList>
          {qualifications.map((qualification, index) => (
            <BulletItem key={index}>
              <BulletDot />
              <span>{qualification}</span>
            </BulletItem>
          ))}
        </BulletList>
      </Section>

      <Separator />

      <Section>
        <SectionHeader>
          <IconCircle>
            <Camera size={20} strokeWidth={2.5} />
          </IconCircle>
          <SectionTitle>촬영 정보</SectionTitle>
        </SectionHeader>
        <InfoGrid>
          <InfoRow>
            <MapPin size={20} />
            <InfoContent>
              <InfoLabel>장소</InfoLabel>
              <InfoValue>{location}</InfoValue>
            </InfoContent>
          </InfoRow>
          <InfoRow>
            <CalendarHeart size={20} />
            <InfoContent>
              <InfoLabel>촬영일</InfoLabel>
              <InfoValue>{shootDate}</InfoValue>
            </InfoContent>
          </InfoRow>
          <InfoRow>
            <Clock size={20} />
            <InfoContent>
              <InfoLabel>촬영 시간</InfoLabel>
              <InfoValue>{shootTime}</InfoValue>
            </InfoContent>
          </InfoRow>
          <InfoRow>
            <CalendarHeart size={20} />
            <InfoContent>
              <InfoLabel>지원 마감일</InfoLabel>
              <InfoValue $isDestructive>{deadline}</InfoValue>
            </InfoContent>
          </InfoRow>
          <InfoRow>
            <PiggyBank size={20} />
            <InfoContent>
              <InfoLabel>출연료</InfoLabel>
              <InfoValue $isPrimary>{fee}</InfoValue>
            </InfoContent>
          </InfoRow>
        </InfoGrid>
      </Section>

      <Separator />

      <Section>
        <SectionHeader>
          <IconCircle>
            <Gift size={20} strokeWidth={2.5} />
          </IconCircle>
          <SectionTitle>상품 정보</SectionTitle>
        </SectionHeader>
        <SectionContent>{productInfo}</SectionContent>
      </Section>
    </DetailContent>
  );
};

const DetailContent = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const IconCircle = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  flex-shrink: 0;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5px;
  }
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
`;

const SectionContent = styled.p`
  color: ${({ theme }) => theme.colors.foreground};
  white-space: pre-line;
  line-height: 1.7;
  font-size: 0.875rem;
  font-weight: 300;
  margin: 0;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.875rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 300;
`;

const BulletDot = styled.span`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  margin-top: 8px;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.colors.muted};
    margin-top: 0.125rem;
    flex-shrink: 0;
  }
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

const InfoLabel = styled.p`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.875rem;
  font-weight: 300;
  margin: 0;
`;

const InfoValue = styled.p<{ $isDestructive?: boolean; $isPrimary?: boolean }>`
  font-weight: 500;
  font-size: 0.875rem;
  color: ${({ theme, $isDestructive, $isPrimary }) => {
    if ($isDestructive) return theme.colors.error;
    if ($isPrimary) return theme.colors.primary;
    return theme.colors.foreground;
  }};
  font-weight: ${({ $isPrimary }) => ($isPrimary ? 700 : 500)};
  margin: 0;
  line-height: 1.4;
`;

const Separator = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

