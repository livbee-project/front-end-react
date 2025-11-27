import type { Meta, StoryObj } from '@storybook/react';
import PortfolioRowCard from './PortfolioRowCard';
import {
  PortfolioRowExamplesSection,
  PortfolioRowListSection,
  PortfolioRowLongTextSection,
} from './PortfolioRowCardStoryContent';

const meta: Meta<typeof PortfolioRowCard> = {
  title: 'Cards/PortfolioRowCard',
  component: PortfolioRowCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '포트폴리오 목록 화면에서 사용되는 가로형 카드 컴포넌트입니다. 제목, 내용, 이미지를 포함하며 제안하기 버튼을 포함할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '카드 제목',
    },
    content: {
      control: 'text',
      description: '카드 내용 (한 줄 소개)',
    },
    imageUrl: {
      control: 'text',
      description: '우측에 표시될 원형 이미지 URL',
    },
    onOfferPress: {
      action: 'offer clicked',
      description: '제안하기 버튼 클릭 시 실행될 함수',
    },
    onCardPress: {
      action: 'card clicked',
      description: '카드 전체 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PortfolioRowCard>;

// ===== 기본 카드 =====
export const Default: Story = {
  args: {
    title: '포트폴리오 제목',
    content: '포트폴리오 내용이 여기에 표시됩니다.',
  },
};

// ===== 이미지 포함 =====
export const WithImage: Story = {
  args: {
    title: '포트폴리오 제목',
    content: '포트폴리오 내용이 여기에 표시됩니다.',
    imageUrl: 'https://via.placeholder.com/100x100',
  },
};

// ===== 제안하기 버튼 포함 =====
export const WithOfferButton: Story = {
  args: {
    title: '포트폴리오 제목',
    content: '포트폴리오 내용이 여기에 표시됩니다.',
    imageUrl: 'https://via.placeholder.com/100x100',
    onOfferPress: () => alert('제안하기 클릭'),
    onCardPress: () => alert('카드 클릭'),
  },
};

// ===== 다양한 예시 =====
export const Examples: Story = {
  render: () => <PortfolioRowExamplesSection />,
  parameters: {
    docs: {
      description: {
        story: '다양한 포트폴리오 카드 예시입니다.',
      },
    },
  },
};

// ===== 긴 텍스트 =====
export const LongText: Story = {
  render: () => <PortfolioRowLongTextSection />,
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 있는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

// ===== 리스트 예시 =====
export const ListExample: Story = {
  render: () => <PortfolioRowListSection />,
  parameters: {
    docs: {
      description: {
        story: '포트폴리오 목록 페이지에서 사용하는 예시입니다.',
      },
    },
  },
};

