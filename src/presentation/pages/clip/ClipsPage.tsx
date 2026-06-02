import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';
import Pagination from '@/presentation/components/list/Pagination';
import { devLog } from '@/shared/utils/logger';

const clips = [
  {
    id: 1,
    title: '영상제목',
    description: 'P.동해물과 백두산이 마르고 닳도록',
    imageUrl:
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: '영상제목 2',
    description: '뷰티 신제품 리뷰 하이라이트',
    imageUrl:
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    title: '영상제목 3',
    description: '데일리 메이크업 루틴',
    imageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    title: '영상제목 4',
    description: '쇼핑 하울 모음',
    imageUrl:
      'https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&w=400&q=80',
  },
];

const ClipsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClipClick = (clipId: number) => {
    devLog(`클립 ${clipId} 클릭`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    devLog(`페이지 ${page}로 변경`);
  };

  return (
    <Container>
      <ContentCardGrid>
        {clips.map((clip) => (
          <ContentCard
            key={clip.id}
            variant="flip"
            imageUrl={clip.imageUrl}
            imageAlt={clip.title}
            heading={clip.title}
            supplementary={clip.description}
            onClick={() => handleClipClick(clip.id)}
          />
        ))}
      </ContentCardGrid>

      <PaginationContainer>
        <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  box-sizing: border-box;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export default ClipsPage;
