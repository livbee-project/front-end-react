import React from 'react';
import styled from 'styled-components';
import ClipCard from './ClipCard';

export const ClipCardList: React.FC = () => (
  <Container>
    {clipCardData.map((card) => (
      <ClipCard key={card.title} {...card} onClick={() => alert(`${card.title} 클릭됨`)} />
    ))}
  </Container>
);

export const ClipCardLongText: React.FC = () => (
  <Container>
    <ClipCard
      imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
      title="매우 긴 제목이 들어가는 경우 어떻게 표시되는지 확인하는 예시입니다"
      description="매우 긴 설명 텍스트가 들어가는 경우에도 텍스트가 잘리지 않고 말줄임표로 처리되어 표시됩니다. 이렇게 긴 텍스트가 들어가도 카드 레이아웃이 깨지지 않습니다."
      profileImageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
    />
  </Container>
);

const clipCardData = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80',
    title: '패션 라이브',
    description: '봄 신상품 소개',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    title: '뷰티 제품 리뷰',
    description: '신제품 화장품 체험 후기',
    profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  },
  {
    title: '라이브 쇼핑',
    description: '실시간 쇼핑 라이브',
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 400px;
`;

