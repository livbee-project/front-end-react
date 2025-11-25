import type { Meta, StoryObj } from '@storybook/react';
import ListPageLayout from './ListPageLayout';
import { MemoryRouter } from 'react-router-dom';
import CampaignCard from '@/presentation/components/cards/CampaignCard';
import Pagination from '@/presentation/components/list/Pagination';
import styled from 'styled-components';
import React, { useState } from 'react';

const meta: Meta<typeof ListPageLayout> = {
  title: 'Layouts/ListPageLayout',
  component: ListPageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '리스트 페이지의 공통 레이아웃 컴포넌트입니다. 검색 입력, 안내 문구, 플로팅 액션 버튼을 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    searchPlaceholder: {
      control: 'text',
      description: '검색 입력 필드 placeholder',
    },
    hintText: {
      control: 'text',
      description: '안내 문구 텍스트',
    },
    floatingActionButtonPath: {
      control: 'text',
      description: '플로팅 액션 버튼 클릭 시 이동할 경로',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListPageLayout>;

// ===== 기본 레이아웃 =====
const ListContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const Default: Story = {
  args: {
    searchPlaceholder: '검색',
    hintText: '카드를 누르면 상세 정보를 보실 수 있습니다.',
    floatingActionButtonPath: '/campaigns/register',
    children: (
      <ListContent>
        <CampaignCard
          brandName="브랜드 1"
          title="공고 제목 1"
          content="공고 내용 1"
        />
        <CampaignCard
          brandName="브랜드 2"
          title="공고 제목 2"
          content="공고 내용 2"
        />
        <CampaignCard
          brandName="브랜드 3"
          title="공고 제목 3"
          content="공고 내용 3"
        />
      </ListContent>
    ),
  },
};

// ===== 모집공고 페이지 =====
export const CampaignPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <ListPageLayout
        searchPlaceholder="모집공고를 검색하세요"
        hintText="카드를 누르면 상세 정보를 보실 수 있습니다."
        floatingActionButtonPath="/campaigns/register"
        onSearch={(query) => alert(`검색: ${query}`)}
      >
        <ListContent>
          <CampaignCard
            brandName="패션 브랜드"
            title="2024 봄/여름 컬렉션 모델 모집"
            content="패션 쇼와 광고 촬영에 참여할 모델을 모집합니다."
          />
          <CampaignCard
            brandName="뷰티 브랜드"
            title="화장품 광고 모델 모집"
            content="신제품 런칭 광고에 출연할 모델을 찾고 있습니다."
          />
          <CampaignCard
            brandName="라이프스타일 브랜드"
            title="인플루언서 협업 모집"
            content="제품 리뷰 및 콘텐츠 제작에 참여할 인플루언서를 모집합니다."
          />
        </ListContent>
        <Pagination currentPage={page} totalPages={5} onPageChange={setPage} />
      </ListPageLayout>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '모집공고 페이지 레이아웃 예시입니다.',
      },
    },
  },
};

// ===== 포트폴리오 페이지 =====
export const PortfolioPage: Story = {
  render: () => {
    const [page, setPage] = useState(1);

    return (
      <ListPageLayout
        searchPlaceholder="포트폴리오를 검색하세요"
        hintText="포트폴리오 카드를 클릭하면 상세 정보를 볼 수 있습니다."
        floatingActionButtonPath="/portfolios/register"
        onSearch={(query) => alert(`검색: ${query}`)}
      >
        <ListContent>
          <div style={{ padding: '20px', backgroundColor: '#f5f6ff', borderRadius: '8px' }}>
            포트폴리오 카드 1
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f5f6ff', borderRadius: '8px' }}>
            포트폴리오 카드 2
          </div>
          <div style={{ padding: '20px', backgroundColor: '#f5f6ff', borderRadius: '8px' }}>
            포트폴리오 카드 3
          </div>
        </ListContent>
        <Pagination currentPage={page} totalPages={8} onPageChange={setPage} />
      </ListPageLayout>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '포트폴리오 페이지 레이아웃 예시입니다.',
      },
    },
  },
};

// ===== 안내 문구 없음 =====
export const WithoutHint: Story = {
  args: {
    searchPlaceholder: '검색',
    floatingActionButtonPath: '/register',
    children: (
      <ListContent>
        <div style={{ padding: '20px', backgroundColor: '#f5f6ff', borderRadius: '8px' }}>
          리스트 아이템
        </div>
      </ListContent>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: '안내 문구가 없는 레이아웃입니다.',
      },
    },
  },
};

