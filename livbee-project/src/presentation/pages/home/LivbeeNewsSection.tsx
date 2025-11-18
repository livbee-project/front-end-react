import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'lucide-react';
import HomeSection from './components/HomeSection';

const newsItems = [
  {
    id: 1,
    title: '라이비, 2025년 상반기 파트너사 모집',
    time: '5분 전',
    content: '브랜드와 쇼호스트를 위한 새로운 협업 프로그램이 시작됩니다.',
  },
  {
    id: 2,
    title: '새로운 기능 업데이트 안내 (v1.2)',
    time: '3일 전',
    content: '스튜디오 예약 기능과 자동 편성 도구가 추가되었습니다.',
  },
];

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.card};
  transition: box-shadow 0.2s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

const Title = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Description = styled.p`
  margin: 0 0 0.75rem;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const LivbeeNewsSection: React.FC = () => (
  <HomeSection title="뉴스" onMore={() => console.log('뉴스 더보기')}>
    <List>
      {newsItems.map((news) => (
        <Card key={news.id}>
          <Title>{news.title}</Title>
          <Description>{news.content}</Description>
          <Meta>
            <Calendar size={14} />
            <span>{news.time}</span>
          </Meta>
        </Card>
      ))}
    </List>
  </HomeSection>
);

export default LivbeeNewsSection;
