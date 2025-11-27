import React from 'react';
import styled from 'styled-components';
import { Calendar } from 'lucide-react';
import HomeSection from './components/HomeSection';
import { H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { debug } from '@/shared/utils/logger';

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
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Card = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.card};
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Title = styled(H3)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Description = styled(PMuted)`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  ${Caption} {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const LivbeeNewsSection: React.FC = () => (
  <HomeSection title="뉴스" onMore={() => debug('LivbeeNewsSection', '뉴스 더보기 클릭')}>
    <List>
      {newsItems.map((news) => (
        <Card key={news.id}>
          <Title>{news.title}</Title>
          <Description>{news.content}</Description>
          <Meta>
            <Calendar size={14} />
            <Caption>{news.time}</Caption>
          </Meta>
        </Card>
      ))}
    </List>
  </HomeSection>
);

export default LivbeeNewsSection;
