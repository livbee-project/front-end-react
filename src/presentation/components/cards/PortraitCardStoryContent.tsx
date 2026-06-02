import React from 'react';
import styled from 'styled-components';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';
import PortraitCard from '@/presentation/components/cards/PortraitCard';

export const PortraitCardSizesSection: React.FC = () => (
  <SizeContainer>
    <PortraitCard title="작은 카드" content="너비 200px" width={200} />
    <PortraitCard title="기본 카드" content="너비 300px (기본값)" width={300} />
    <PortraitCard title="큰 카드" content="너비 400px" width={400} />
  </SizeContainer>
);

export const PortraitCardScrollSection: React.FC = () => (
  <ContentCardGrid>
    {Array.from({ length: 5 }).map((_, index) => (
      <PortraitCard
        key={index}
        title={`모델 ${index + 1}`}
        content="한 줄 소개"
        onPress={() => alert(`카드 ${index + 1} 클릭`)}
      />
    ))}
  </ContentCardGrid>
);

export const PortraitCardUsageSection: React.FC = () => (
  <ContentCardGrid>
    <PortraitCard
      imageUrl="https://via.placeholder.com/300x400"
      title="김모델"
      content="패션 모델, 5년 경력"
      onPress={() => alert('김모델 클릭')}
    />
    <PortraitCard
      imageUrl="https://via.placeholder.com/300x400"
      title="이모델"
      content="뷰티 모델, 3년 경력"
      onPress={() => alert('이모델 클릭')}
    />
    <PortraitCard
      imageUrl="https://via.placeholder.com/300x400"
      title="박모델"
      content="라이프스타일 모델, 신인"
      onPress={() => alert('박모델 클릭')}
    />
  </ContentCardGrid>
);

const SizeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

