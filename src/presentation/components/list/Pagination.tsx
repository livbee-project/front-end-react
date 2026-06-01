import React from 'react';
import styled from 'styled-components';

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
   * 페이지 번호 배열 생성
   */
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Container>
      {pages.map((page) => (
        <PageButton
          key={page}
          $isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
`;

const PageButton = styled.button<{ $isActive: boolean }>`
  min-width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ $isActive }) => ($isActive ? 700 : 400)};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.foreground : theme.colors.muted};
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0 ${({ theme }) => theme.spacing.xs};
`;

export default Pagination;

