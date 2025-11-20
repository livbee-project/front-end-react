import React from 'react';
import styled from 'styled-components';
import { H2, PMuted } from '@/presentation/components/styled/Typography';
import type { PortfolioRole } from '@/types/portfolio';

interface MyPortfolioHeaderProps {
  activeRole: PortfolioRole;
  onManageClick: () => void;
}

export const MyPortfolioHeader: React.FC<MyPortfolioHeaderProps> = ({
  activeRole,
  onManageClick,
}) => {
  return (
    <HeaderRow>
      <div>
        <PageTitle>
          {activeRole === 'showhost' ? '쇼호스트 포트폴리오' : '모델 포트폴리오'}
        </PageTitle>
        <PageDescription>나의 포트폴리오를 관리하고 기본 포트폴리오를 설정하세요.</PageDescription>
      </div>
      <HeaderButton type="button" onClick={onManageClick}>
        관리
      </HeaderButton>
    </HeaderRow>
  );
};

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: flex-start;
`;

const PageTitle = styled(H2)`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const PageDescription = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
`;

const HeaderButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font: ${({ theme }) => theme.fonts.button};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
`;

