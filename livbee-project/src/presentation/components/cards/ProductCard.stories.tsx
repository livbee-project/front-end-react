import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';
import {
  ProductCardExamplesSection,
  ProductCardListSection,
  ProductCardLongNameSection,
} from './ProductCardStoryContent';

const meta: Meta<typeof ProductCard> = {
  title: 'Cards/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '관련 상품 정보를 표시하는 카드 컴포넌트입니다. 모집 공고 상세 페이지의 관련 상품 섹션에서 사용됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: 'text',
      description: '상품 이미지 URL',
    },
    productName: {
      control: 'text',
      description: '상품명',
    },
    onClick: {
      action: 'clicked',
      description: '카드 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

// ===== 기본 카드 =====
export const Default: Story = {
  args: {
    productName: '상품명',
  },
};

// ===== 이미지 포함 =====
export const WithImage: Story = {
  args: {
    imageUrl: 'https://via.placeholder.com/60x60',
    productName: '상품명',
  },
};

// ===== 다양한 예시 =====
export const Examples: Story = {
  render: () => <ProductCardExamplesSection />,
  parameters: {
    docs: {
      description: {
        story: '다양한 상품 카드 예시입니다.',
      },
    },
  },
};

// ===== 긴 상품명 =====
export const LongProductName: Story = {
  render: () => <ProductCardLongNameSection />,
  parameters: {
    docs: {
      description: {
        story: '긴 상품명이 있는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

// ===== 리스트 예시 =====
export const ListExample: Story = {
  render: () => <ProductCardListSection />,
  parameters: {
    docs: {
      description: {
        story: '모집 공고 상세 페이지의 관련 상품 섹션에서 사용하는 예시입니다.',
      },
    },
  },
};

