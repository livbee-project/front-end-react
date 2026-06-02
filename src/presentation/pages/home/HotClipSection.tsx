import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection from '@/presentation/pages/home/components/HomeSection';
import { Caption } from '@/presentation/components/styled/Typography';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';

const clips = [
  {
    id: 1,
    title: '겨울 코디 꿀팁 모음',
    description: '3가지 아이템으로 완성하는 겨울 룩',
    duration: '1:23',
    thumbnail: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: '뷰티 신제품 리뷰',
    description: '화제의 스킨케어 제품 테스트',
    duration: '2:45',
    thumbnail: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: '데일리 메이크업 루틴',
    description: '10분 완성 자연스러운 메이크업',
    duration: '0:58',
    thumbnail: 'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: '쇼핑 하울 하이라이트',
    description: '이번 달 득템 아이템 공개',
    duration: '1:12',
    thumbnail: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
  },
];

const DurationBadge = styled.span`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background-color: rgba(0, 0, 0, 0.7);
  color: ${({ theme }) => theme.colors.primaryForeground};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.sm};

  ${Caption} {
    color: inherit;
  }
`;

const HotClipSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomeSection title="HOT CLIP" onMore={() => navigate('/clips')}>
      <ContentCardGrid>
        {clips.map((clip) => (
          <ContentCard
            key={clip.id}
            variant="flip"
            imageUrl={clip.thumbnail}
            imageAlt={clip.title}
            heading={clip.title}
            supplementary={clip.description}
            mediaOverlay={
              <DurationBadge>
                <Caption>{clip.duration}</Caption>
              </DurationBadge>
            }
            onClick={() => navigate('/clips')}
          />
        ))}
      </ContentCardGrid>
    </HomeSection>
  );
};

export default HotClipSection;
