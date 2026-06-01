import { useState, useMemo, useCallback } from 'react';
import { useToast } from '@/presentation/contexts/ToastContext';
import { ITEMS_PER_PAGE } from '@/shared/constants/portfolio';
import type { MyPortfolioItem, PortfolioRole } from '@/types/portfolio';

interface UseMyPortfolioProps {
  initialPortfolios: MyPortfolioItem[];
  activeRole: PortfolioRole;
}

interface UseMyPortfolioReturn {
  portfolios: MyPortfolioItem[];
  filteredPortfolios: MyPortfolioItem[];
  currentPage: number;
  totalPages: number;
  pageItems: MyPortfolioItem[];
  setCurrentPage: (page: number) => void;
  handleTogglePinned: (id: number) => void;
  handleSetDefault: (id: number) => void;
  handleDelete: (id: number) => void;
  handlePageChange: (page: number) => void;
}

export const useMyPortfolio = ({
  initialPortfolios,
  activeRole,
}: UseMyPortfolioProps): UseMyPortfolioReturn => {
  const { showToast } = useToast();
  const [portfolios, setPortfolios] = useState<MyPortfolioItem[]>(initialPortfolios);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPortfolios = useMemo(
    () => portfolios.filter((item) => item.role === activeRole),
    [portfolios, activeRole]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPortfolios.length / ITEMS_PER_PAGE));
  const pageItems = filteredPortfolios.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTogglePinned = useCallback((id: number) => {
    setPortfolios((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isPinned: !item.isPinned } : item))
    );
  }, []);

  const handleSetDefault = useCallback(
    (id: number) => {
      setPortfolios((prev) =>
        prev.map((item) =>
          item.role === activeRole ? { ...item, isDefault: item.id === id } : item
        )
      );
      showToast('기본 포트폴리오가 변경되었습니다.');
    },
    [activeRole, showToast]
  );

  const handleDelete = useCallback(
    (id: number) => {
      if (!window.confirm('해당 포트폴리오를 삭제하시겠어요?')) {
        return;
      }
      setPortfolios((prev) => prev.filter((item) => item.id !== id));
      showToast('포트폴리오가 삭제되었습니다.');
    },
    [showToast]
  );

  return {
    portfolios,
    filteredPortfolios,
    currentPage,
    totalPages,
    pageItems,
    setCurrentPage,
    handleTogglePinned,
    handleSetDefault,
    handleDelete,
    handlePageChange,
  };
};

