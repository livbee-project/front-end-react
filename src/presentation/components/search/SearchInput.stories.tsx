import type { Meta, StoryObj } from '@storybook/react';
import SearchInput from '@/presentation/components/search/SearchInput';
import {
  SearchPlaceholderDemo,
  SearchSubmitDemo,
  SearchStateDemo,
  SearchUsageDemo,
} from '@/presentation/components/search/SearchInputStoryContent';

const meta: Meta<typeof SearchInput> = {
  title: 'Navigation/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '검색 입력 컴포넌트입니다. 모집공고, 포트폴리오 등에서 사용되는 공통 검색바 UI입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    onSearchSubmit: {
      action: 'search submitted',
      description: '엔터 키 입력 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

// ===== 기본 검색 =====
export const Default: Story = {
  args: {
    placeholder: '검색',
  },
};

// ===== 다양한 플레이스홀더 =====
export const Placeholders: Story = {
  render: () => <SearchPlaceholderDemo />,
  parameters: {
    docs: {
      description: {
        story: '다양한 플레이스홀더를 가진 검색 입력 필드입니다.',
      },
    },
  },
};

// ===== 검색 제출 =====
export const WithSubmit: Story = {
  render: () => <SearchSubmitDemo />,
  parameters: {
    docs: {
      description: {
        story: '엔터 키를 누르면 onSearchSubmit 콜백이 실행됩니다.',
      },
    },
  },
};

// ===== 다양한 상태 =====
export const States: Story = {
  render: () => <SearchStateDemo />,
  parameters: {
    docs: {
      description: {
        story: '검색 입력 필드의 다양한 상태입니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => <SearchUsageDemo />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 다양한 페이지에서 검색 기능으로 사용할 수 있습니다.',
      },
    },
  },
};

