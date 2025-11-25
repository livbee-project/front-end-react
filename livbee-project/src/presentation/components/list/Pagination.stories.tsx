import type { Meta, StoryObj } from '@storybook/react';
import Pagination from './Pagination';
import styled from 'styled-components';
import React, { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'UI Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '페이지네이션 컴포넌트입니다. 숫자 버튼을 통해 페이지를 이동할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: '현재 페이지 번호 (1부터 시작)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: '전체 페이지 수',
    },
    onPageChange: {
      action: 'page changed',
      description: '페이지 변경 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

// ===== 기본 페이지네이션 =====
const BasicPaginationWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination
      currentPage={currentPage}
      totalPages={5}
      onPageChange={setCurrentPage}
    />
  );
};

export const Default: Story = {
  render: () => <BasicPaginationWrapper />,
};

// ===== 다양한 페이지 수 =====
const PageCountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

export const DifferentPageCounts: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);
    const [page4, setPage4] = useState(1);

    return (
      <PageCountContainer>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            3페이지
          </h3>
          <Pagination currentPage={page1} totalPages={3} onPageChange={setPage1} />
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            5페이지
          </h3>
          <Pagination currentPage={page2} totalPages={5} onPageChange={setPage2} />
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            10페이지
          </h3>
          <Pagination currentPage={page3} totalPages={10} onPageChange={setPage3} />
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
            20페이지
          </h3>
          <Pagination currentPage={page4} totalPages={20} onPageChange={setPage4} />
        </div>
      </PageCountContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 페이지 수의 페이지네이션입니다. 많은 페이지가 있어도 모든 페이지 번호가 표시됩니다.',
      },
    },
  },
};

// ===== 활성화 상태 =====
export const ActiveStates: Story = {
  render: () => {
    const [page, setPage] = useState(3);

    return (
      <div>
        <p style={{ marginBottom: '16px', fontSize: '14px', color: '#717182' }}>
          현재 페이지: {page} (활성화된 페이지는 굵은 글씨로 표시됩니다)
        </p>
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '활성화된 페이지는 굵은 글씨와 진한 색상으로 표시됩니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const UsageExamples: Story = {
  render: () => {
    const [campaignPage, setCampaignPage] = useState(1);
    const [portfolioPage, setPortfolioPage] = useState(1);

    return (
      <ExampleContainer>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 700 }}>
            모집공고 페이지
          </h3>
          <Pagination
            currentPage={campaignPage}
            totalPages={8}
            onPageChange={setCampaignPage}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 700 }}>
            포트폴리오 페이지
          </h3>
          <Pagination
            currentPage={portfolioPage}
            totalPages={15}
            onPageChange={setPortfolioPage}
          />
        </div>
      </ExampleContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 리스트 페이지 하단에 표시됩니다.',
      },
    },
  },
};

