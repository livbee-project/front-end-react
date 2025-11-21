import React, { useState } from 'react';
import styled from 'styled-components';
import ClipCard from '@/presentation/components/cards/ClipCard';
import Pagination from '@/presentation/components/list/Pagination';
import { devLog } from '@/shared/utils/logger';

/**
 * 숏클립 페이지 컴포넌트입니다.
 * 2x2 그리드 레이아웃으로 비디오 카드들을 표시합니다.
 */
const ClipsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * 임시 클립 데이터
   */
  const clips = [
    {
      id: 1,
      title: '영상제목',
      description: 'P.동해물과 백두산이 마르고 닳도록',
      imageUrl: undefined,
      profileImageUrl: undefined,
    },
    {
      id: 2,
      title: '영상제목',
      description: 'P.동해물과 백두산이 마르고 닳도록',
      imageUrl: undefined,
      profileImageUrl: undefined,
    },
    {
      id: 3,
      title: '영상제목',
      description: 'P.동해물과 백두산이 마르고 닳도록',
      imageUrl: undefined,
      profileImageUrl: undefined,
    },
    {
      id: 4,
      title: '영상제목',
      description: 'P.동해물과 백두산이 마르고 닳도록',
      imageUrl: undefined,
      profileImageUrl: undefined,
    },
  ];

  /**
   * 클립 카드 클릭 핸들러
   */
  const handleClipClick = (clipId: number) => {
    devLog(`클립 ${clipId} 클릭`);
    // TODO: 클립 상세 페이지로 이동
    // navigate(`/clips/${clipId}`);
  };

  /**
   * 페이지 변경 핸들러
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    devLog(`페이지 ${page}로 변경`);
    // TODO: 페이지 변경 시 데이터 로드
  };

  return (
    <Container>
      {/* 클립 그리드 */}
      <GridContainer>
        {clips.map((clip) => (
          <ClipCard
            key={clip.id}
            imageUrl={clip.imageUrl}
            title={clip.title}
            description={clip.description}
            profileImageUrl={clip.profileImageUrl}
            onClick={() => handleClipClick(clip.id)}
          />
        ))}
      </GridContainer>

      {/* 페이지네이션 */}
      <PaginationContainer>
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={handlePageChange}
        />
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export default ClipsPage;

