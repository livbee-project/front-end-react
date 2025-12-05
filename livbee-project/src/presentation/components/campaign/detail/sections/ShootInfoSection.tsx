import React from 'react';
import { Camera, MapPin, CalendarHeart, Clock, PiggyBank } from 'lucide-react';
import {
  Section,
  SectionHeader,
  IconCircle,
  SectionTitle,
  InfoGrid,
  InfoRow,
  InfoContent,
  InfoLabel,
  InfoValue,
} from '../styles/CampaignInfoSection.styles';

interface ShootInfoSectionProps {
  location: string;
  shootDate: string;
  shootTime: string;
  deadline: string;
  fee: string;
}

export const ShootInfoSection: React.FC<ShootInfoSectionProps> = ({
  location,
  shootDate,
  shootTime,
  deadline,
  fee,
}) => {
  return (
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
  );
};

