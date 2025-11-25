import type { Meta, StoryObj } from '@storybook/react';
import ProductCard from './ProductCard';
import styled from 'styled-components';
import React from 'react';

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
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 500px;
`;

export const Examples: Story = {
  render: () => (
    <CardContainer>
      <ProductCard
        imageUrl="https://via.placeholder.com/60x60"
        productName="패션 아이템 1"
        onClick={() => alert('상품 1 클릭')}
      />
      <ProductCard
        imageUrl="https://via.placeholder.com/60x60"
        productName="뷰티 제품 2"
        onClick={() => alert('상품 2 클릭')}
      />
      <ProductCard
        productName="이미지 없는 상품"
        onClick={() => alert('상품 3 클릭')}
      />
    </CardContainer>
  ),
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
  render: () => (
    <CardContainer>
      <ProductCard
        imageUrl="https://via.placeholder.com/60x60"
        productName="매우 긴 상품명이 여기에 표시되며 텍스트가 길어지면 말줄임표로 처리됩니다"
        onClick={() => alert('상품 클릭')}
      />
    </CardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '긴 상품명이 있는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

// ===== 리스트 예시 =====
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 600px;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const ListExample: Story = {
  render: () => (
    <ListContainer>
      <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 700 }}>관련 상품</h3>
      <ProductCard
        imageUrl="https://via.placeholder.com/60x60"
        productName="패션 아이템 1"
        onClick={() => alert('상품 1 클릭')}
      />
      <ProductCard
        imageUrl="https://via.placeholder.com/60x60"
        productName="뷰티 제품 2"
        onClick={() => alert('상품 2 클릭')}
      />
      <ProductCard
        imageUrl="https://via.placeholder.com/60x60"
        productName="라이프스타일 제품 3"
        onClick={() => alert('상품 3 클릭')}
      />
    </ListContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '모집 공고 상세 페이지의 관련 상품 섹션에서 사용하는 예시입니다.',
      },
    },
  },
};

