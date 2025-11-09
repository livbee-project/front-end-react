import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioRowCard from '@/presentation/components/cards/PortfolioRowCard';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import Pagination from '@/presentation/components/list/Pagination';
import FloatingActionButton from '@/presentation/components/ui/FloatingActionButton';

/**
 * 리스트 렌더링을 위한 임시 목업 데이터
 */
const MOCK_MY_PORTFOLIOS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `오해원${i + 1 > 1 ? ` ${i + 1}` : ''}`,
  content: 'P.동해물과 백두산이 마르고 닳도록',
  imageUrl: undefined, // 프로필 이미지 URL (선택)
}));

/**
 * 페이지당 표시할 항목 수
 */
const ITEMS_PER_PAGE = 5;

/**
 * 마이 포트폴리오 목록 페이지 컴포넌트입니다.
 * 마이페이지에서 "쇼호스트 포트폴리오 관리"를 클릭하면 이 페이지로 이동합니다.
 */
const MyPortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * 전체 페이지 수 계산
   */
  const totalPages = Math.ceil(MOCK_MY_PORTFOLIOS.length / ITEMS_PER_PAGE);

  /**
   * 현재 페이지에 표시할 항목들 계산
   */
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = MOCK_MY_PORTFOLIOS.slice(startIndex, endIndex);

  /**
   * 페이지 변경 핸들러
   */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤을 맨 위로 이동
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * 포트폴리오 카드 클릭 핸들러
   */
  const handlePortfolioClick = (id: number) => {
    navigate(`/portfolios/${id}`);
  };

  /**
   * 포트폴리오 등록 버튼 클릭 핸들러
   */
  const handleRegisterClick = () => {
    navigate('/portfolios/register');
  };

  return (
    <div style={{ padding: '0' }}>
      {/* 포트폴리오 리스트 */}
      <VerticalList showDividers={true}>
        {currentItems.map((portfolio) => (
          <ListItem
            key={portfolio.id}
            onTap={() => handlePortfolioClick(portfolio.id)}
          >
            <PortfolioRowCard
              title={portfolio.name}
              content={portfolio.content}
              imageUrl={portfolio.imageUrl}
              onCardPress={() => handlePortfolioClick(portfolio.id)}
            />
          </ListItem>
        ))}
      </VerticalList>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* 플로팅 액션 버튼 */}
      <FloatingActionButton onClick={handleRegisterClick} />
    </div>
  );
};

export default MyPortfolioPage;

