import React from 'react';
import { SPACING, GAP } from '@/presentation/styles/constants';

/**
 * Pagination 컴포넌트가 받을 props 타입을 정의합니다.
 * @param currentPage - 현재 페이지 번호 (1부터 시작)
 * @param totalPages - 전체 페이지 수
 * @param onPageChange - 페이지 변경 시 실행될 함수 (페이지 번호 전달)
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

/**
 * 페이지네이션 컴포넌트입니다.
 * 숫자 버튼을 통해 페이지를 이동할 수 있습니다.
 */
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  /**
   * 페이지네이션 컨테이너 스타일
   */
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: GAP.SM,
    padding: `${SPACING.XXL} ${SPACING.LG}`,
  };

  /**
   * 페이지 번호 버튼 스타일
   */
  const getPageButtonStyle = (page: number): React.CSSProperties => {
    const isActive = page === currentPage;
    return {
      minWidth: '32px',
      height: '32px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 'var(--p2)', // 14px
      fontWeight: isActive ? 700 : 400,
      color: isActive ? 'var(--black)' : 'var(--dark-gray)',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: `0 ${GAP.SM}`,
    };
  };

  /**
   * 페이지 번호 배열 생성
   */
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div style={containerStyle}>
      {pages.map((page) => (
        <button
          key={page}
          style={getPageButtonStyle(page)}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

