import type { Meta, StoryObj } from '@storybook/react';
import Pagination from '@/presentation/components/list/Pagination';
import React from 'react';
import {
  PaginationActiveDemo,
  PaginationCountsDemo,
  PaginationUsageDemo,
} from '@/presentation/components/list/PaginationStoryContent';

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
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 5,
  },
};

// ===== 다양한 페이지 수 =====
export const DifferentPageCounts: Story = {
  render: () => <PaginationCountsDemo />,
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
  render: () => <PaginationActiveDemo />,
  parameters: {
    docs: {
      description: {
        story: '활성화된 페이지는 굵은 글씨와 진한 색상으로 표시됩니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => <PaginationUsageDemo />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 리스트 페이지 하단에 표시됩니다.',
      },
    },
  },
};

