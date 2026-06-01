import React from 'react';
import styled from 'styled-components';
import PortfolioRowCard from '@/presentation/components/cards/PortfolioRowCard';

export const PortfolioRowExamplesSection: React.FC = () => (
  <CardContainer>
    {portfolioExamples.map((card) => (
      <PortfolioRowCard key={card.title} {...card} />
    ))}
  </CardContainer>
);

export const PortfolioRowLongTextSection: React.FC = () => (
  <CardContainer>
    <PortfolioRowCard
      title="매우 긴 포트폴리오 제목이 여기에 표시되며 텍스트가 길어지면 말줄임표로 처리됩니다"
      content="매우 긴 포트폴리오 내용이 여기에 표시되며 텍스트가 길어지면 말줄임표로 처리됩니다."
      imageUrl="https://via.placeholder.com/100x100"
      onOfferPress={() => alert('제안하기 클릭')}
      onCardPress={() => alert('카드 클릭')}
    />
  </CardContainer>
);

export const PortfolioRowListSection: React.FC = () => (
  <ListContainer>
    {portfolioExamples.map((card) => (
      <PortfolioRowCard key={card.title} {...card} />
    ))}
  </ListContainer>
);

const portfolioExamples = [
  {
    title: '패션 포트폴리오',
    content: '5년 경력의 패션 모델 포트폴리오입니다.',
    imageUrl: 'https://via.placeholder.com/100x100',
    onOfferPress: () => alert('제안하기 클릭'),
    onCardPress: () => alert('카드 클릭'),
  },
  {
    title: '뷰티 포트폴리오',
    content: '화장품 광고 전문 모델 포트폴리오입니다.',
    imageUrl: 'https://via.placeholder.com/100x100',
    onOfferPress: () => alert('제안하기 클릭'),
    onCardPress: () => alert('카드 클릭'),
  },
  {
    title: '라이프스타일 포트폴리오',
    content: '일상 속 스타일링을 보여주는 포트폴리오입니다.',
    imageUrl: 'https://via.placeholder.com/100x100',
    onCardPress: () => alert('카드 클릭'),
  },
];

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 800px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

