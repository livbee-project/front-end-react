import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import HomeSection from './components/HomeSection';

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
    thumbnail: 'https://images.unsplash.com/photo-1504198453319-5ce911bafcde?auto=format&fit=crop&w=400&q=80',
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

const ScrollArea = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.article`
  flex: 0 0 180px;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
`;

const ClipImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Duration = styled.span`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 12px;
`;

const ClipBody = styled.div`
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ClipTitle = styled.h3`
  margin: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ClipDescription = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const HotClipSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <HomeSection title="HOT CLIP" onMore={() => navigate('/clips')}>
      <ScrollArea>
        {clips.map((clip) => (
          <Card key={clip.id}>
            <Thumbnail>
              <ClipImage src={clip.thumbnail} alt={clip.title} />
              <Duration>{clip.duration}</Duration>
            </Thumbnail>
            <ClipBody>
              <ClipTitle>{clip.title}</ClipTitle>
              <ClipDescription>{clip.description}</ClipDescription>
            </ClipBody>
          </Card>
        ))}
      </ScrollArea>
    </HomeSection>
  );
};

export default HotClipSection;