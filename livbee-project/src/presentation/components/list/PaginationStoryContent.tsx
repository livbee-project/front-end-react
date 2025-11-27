import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from './Pagination';

export const PaginationCountsDemo: React.FC = () => {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(1);
  const [page3, setPage3] = useState(1);
  const [page4, setPage4] = useState(1);

  return (
    <PageCountContainer>
      {[
        { title: '3페이지', total: 3, value: page1, setter: setPage1 },
        { title: '5페이지', total: 5, value: page2, setter: setPage2 },
        { title: '10페이지', total: 10, value: page3, setter: setPage3 },
        { title: '20페이지', total: 20, value: page4, setter: setPage4 },
      ].map(({ title, total, value, setter }) => (
        <div key={title}>
          <SectionTitle>{title}</SectionTitle>
          <Pagination currentPage={value} totalPages={total} onPageChange={setter} />
        </div>
      ))}
    </PageCountContainer>
  );
};

export const PaginationActiveDemo: React.FC = () => {
  const [page, setPage] = useState(3);

  return (
    <div>
      <ActiveHelper>현재 페이지: {page} (활성화된 페이지는 굵은 글씨로 표시됩니다)</ActiveHelper>
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    </div>
  );
};

export const PaginationUsageDemo: React.FC = () => {
  const [campaignPage, setCampaignPage] = useState(1);
  const [portfolioPage, setPortfolioPage] = useState(1);

  return (
    <ExampleContainer>
      <ExampleBlock>
        <SectionTitle>모집공고 페이지</SectionTitle>
        <Pagination currentPage={campaignPage} totalPages={8} onPageChange={setCampaignPage} />
      </ExampleBlock>
      <ExampleBlock>
        <SectionTitle>포트폴리오 페이지</SectionTitle>
        <Pagination currentPage={portfolioPage} totalPages={15} onPageChange={setPortfolioPage} />
      </ExampleBlock>
    </ExampleContainer>
  );
};

const PageCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const SectionTitle = styled.h3`
  margin-bottom: 12px;
  font-size: 14px;
  font-weight: 600;
`;

const ActiveHelper = styled.p`
  margin-bottom: 16px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ExampleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

