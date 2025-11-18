import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Sparkles } from 'lucide-react';

const highlights = [
  {
    id: 1,
    title: '신규 캠페인',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80',
    gradient: 'linear-gradient(135deg, #ec4899, #fbbf24)',
    isNew: true,
  },
  {
    id: 2,
    title: '라이브 스케줄',
    image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=200&q=80',
    gradient: 'linear-gradient(135deg, #a855f7, #f472b6)',
    isNew: false,
  },
  {
    id: 3,
    title: '스튜디오',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80',
    gradient: 'linear-gradient(135deg, #60a5fa, #f472b6)',
    isNew: false,
  },
  {
    id: 4,
    title: '프로모션',
    image: 'https://images.unsplash.com/photo-1514512364185-4c2babc3c5fb?auto=format&fit=crop&w=200&q=80',
    gradient: 'linear-gradient(135deg, #fbbf24, #3b82f6)',
    isNew: true,
  },
];

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Wrapper = styled.section`
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

const ScrollArea = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const HighlightItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 80px;
  text-align: center;
  gap: 0.5rem;
`;

const HighlightRing = styled.div<{ $gradient: string; $animate: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  padding: 2.5px;
  background: ${({ $gradient }) => $gradient};
  animation: ${({ $animate }) =>
    $animate
      ? css`
          ${pulse} 2s infinite
        `
      : 'none'};
  position: relative;
`;

const HighlightImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HighlightTitle = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StoryHighlightsSection: React.FC = () => (
  <Wrapper>
    <ScrollArea>
      {highlights.map((story) => (
        <HighlightItem key={story.id}>
          <HighlightRing $gradient={story.gradient} $animate={story.isNew}>
            {story.isNew && (
              <Sparkles
                size={20}
                color="#687CF4"
                style={{ position: 'absolute', top: -6, right: -6 }}
              />
            )}
            <HighlightImage>
              <img src={story.image} alt={story.title} width={66} height={66} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
            </HighlightImage>
          </HighlightRing>
          <HighlightTitle>{story.title}</HighlightTitle>
        </HighlightItem>
      ))}
    </ScrollArea>
  </Wrapper>
);

export default StoryHighlightsSection;

