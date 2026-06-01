import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Pagination from '@/presentation/components/list/Pagination';
import FloatingActionButton from '@/presentation/components/ui/FloatingActionButton';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { MOCK_PORTFOLIOS, ITEMS_PER_PAGE } from '@/shared/constants/portfolio';
import { useMyPortfolio } from '@/presentation/hooks/mypage/useMyPortfolio';
import { MyPortfolioHeader } from '@/presentation/components/portfolio/MyPortfolioHeader';
import { MyPortfolioCard } from '@/presentation/components/portfolio/MyPortfolioCard';
import type { PortfolioRole } from '@/types/portfolio';

const MyPortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeRole: PortfolioRole =
    (location.state as { role?: PortfolioRole } | null)?.role ?? 'showhost';

  const {
    filteredPortfolios,
    currentPage,
    totalPages,
    pageItems,
    handleTogglePinned,
    handleSetDefault,
    handleDelete,
    handlePageChange,
  } = useMyPortfolio({
    initialPortfolios: MOCK_PORTFOLIOS,
    activeRole,
  });

  const handleCardClick = (id: number) => {
    navigate(`/portfolios/${id}`);
  };

  const handleEdit = (id: number) => {
    navigate('/portfolios/register', { state: { portfolioId: id } });
  };

  const handleRegisterClick = () => {
    navigate('/portfolios/register');
  };

  return (
    <PageWrapper>
      <MyPortfolioHeader activeRole={activeRole} onManageClick={handleRegisterClick} />

      {pageItems.length === 0 ? (
        <EmptyState message="등록된 포트폴리오가 없습니다." />
      ) : (
        <CardList>
          {pageItems.map((item) => (
            <MyPortfolioCard
              key={item.id}
              item={item}
              onCardClick={() => handleCardClick(item.id)}
              onPinClick={(event) => {
                event.stopPropagation();
                handleTogglePinned(item.id);
              }}
              onDefaultClick={() => handleSetDefault(item.id)}
              onEditClick={() => handleEdit(item.id)}
              onDeleteClick={() => handleDelete(item.id)}
            />
          ))}
        </CardList>
      )}

      {filteredPortfolios.length > ITEMS_PER_PAGE && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </PaginationWrapper>
      )}

      <FloatingActionButton onClick={handleRegisterClick} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default MyPortfolioPage;
