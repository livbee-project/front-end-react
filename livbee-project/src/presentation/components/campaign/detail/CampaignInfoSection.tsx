import React from 'react';
import styled from 'styled-components';
import { FileText, CheckCircle, Briefcase, MapPin, Calendar, Clock, DollarSign, Tag } from 'lucide-react';
import { DetailKeyValueList } from '@/presentation/components/detail/common/DetailKeyValueList';

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
    <ContentCard>
      <Section>
        <SectionHeader>
          <SectionIcon>
            <FileText size={20} />
          </SectionIcon>
          <SectionTitle>캠페인 소개</SectionTitle>
        </SectionHeader>
        <SectionContent>{campaignIntro}</SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <SectionIcon>
            <CheckCircle size={20} />
          </SectionIcon>
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

      <Section>
        <SectionHeader>
          <SectionIcon>
            <Briefcase size={20} />
          </SectionIcon>
          <SectionTitle>촬영 정보</SectionTitle>
        </SectionHeader>
        <DetailKeyValueList
          items={[
            { icon: <MapPin size={18} />, label: '장소', value: location },
            { icon: <Calendar size={18} />, label: '촬영일', value: shootDate },
          ]}
        />
      </Section>

      <Divider />

      <DetailKeyValueList
        items={[
          { icon: <Clock size={18} />, label: '촬영 시간', value: shootTime },
          { icon: <Calendar size={18} />, label: '지원 마감일', value: deadline },
          { icon: <DollarSign size={18} />, label: '출연료', value: fee },
        ]}
      />

      <Divider />
      <DetailKeyValueList
        items={[{ icon: <Tag size={18} />, label: '상품 정보', value: productInfo }]}
        dense
      />
    </ContentCard>
  );
};

const ContentCard = styled.div`
  background: #ffffff;
  margin: 0 16px;
  padding: 24px 20px;
  border-radius: 0 0 20px 20px;
`;

const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #5a64ff;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0;
`;

const SectionContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #434659;
  white-space: pre-wrap;
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
  font-size: 0.95rem;
  line-height: 1.6;
  color: #434659;
`;

const BulletDot = styled.span`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5a64ff;
  margin-top: 8px;
`;

const Divider = styled.div`
  height: 1px;
  background: #eceff7;
  margin: 24px 0;
`;

