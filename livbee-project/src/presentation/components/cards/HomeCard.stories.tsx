import type { Meta, StoryObj } from '@storybook/react';
import { HomeCard } from './HomeCard';
import { HomeCardImage } from './HomeCardImage';
import { HomeCardBody, HomeCardBrand, HomeCardTitle, HomeCardDescription, HomeCardMetaRow, CTAButton } from './HomeCardBody';
import styled from 'styled-components';
import React from 'react';
import { Caption } from '@/presentation/components/styled/Typography';

const meta: Meta<typeof HomeCard> = {
  title: 'Cards/HomeCard',
  component: HomeCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '홈 화면에서 사용되는 카드 컴포넌트입니다. 이미지, 브랜드, 제목, 설명, 메타 정보를 포함합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ===== 기본 카드 =====
export const Default: Story = {
  render: () => (
    <HomeCard>
      <HomeCardImage src="https://via.placeholder.com/300x300" alt="카드 이미지" />
      <HomeCardBody>
        <HomeCardBrand>BRAND</HomeCardBrand>
        <HomeCardTitle>카드 제목</HomeCardTitle>
        <HomeCardDescription>카드 설명이 여기에 표시됩니다. 여러 줄의 텍스트가 표시될 수 있습니다.</HomeCardDescription>
        <HomeCardMetaRow>
          <Caption>2024.01.15</Caption>
          <Caption>조회수 1,234</Caption>
        </HomeCardMetaRow>
        <CTAButton>자세히 보기</CTAButton>
      </HomeCardBody>
    </HomeCard>
  ),
};

// ===== 다양한 예시 =====
const CardContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.lg} 0;
  
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
`;

export const Examples: Story = {
  render: () => (
    <CardContainer>
      <HomeCard>
        <HomeCardImage src="https://via.placeholder.com/300x300" alt="카드 1" />
        <HomeCardBody>
          <HomeCardBrand>FASHION</HomeCardBrand>
          <HomeCardTitle>2024 봄/여름 컬렉션</HomeCardTitle>
          <HomeCardDescription>새로운 시즌의 패션 트렌드를 만나보세요.</HomeCardDescription>
          <HomeCardMetaRow>
            <Caption>2024.01.15</Caption>
            <Caption>조회수 5,678</Caption>
          </HomeCardMetaRow>
          <CTAButton>자세히 보기</CTAButton>
        </HomeCardBody>
      </HomeCard>
      <HomeCard>
        <HomeCardImage src="https://via.placeholder.com/300x300" alt="카드 2" />
        <HomeCardBody>
          <HomeCardBrand>BEAUTY</HomeCardBrand>
          <HomeCardTitle>신제품 런칭</HomeCardTitle>
          <HomeCardDescription>최신 뷰티 제품을 먼저 만나보세요.</HomeCardDescription>
          <HomeCardMetaRow>
            <Caption>2024.01.14</Caption>
            <Caption>조회수 3,456</Caption>
          </HomeCardMetaRow>
          <CTAButton>자세히 보기</CTAButton>
        </HomeCardBody>
      </HomeCard>
      <HomeCard>
        <HomeCardImage src="https://via.placeholder.com/300x300" alt="카드 3" />
        <HomeCardBody>
          <HomeCardBrand>LIFESTYLE</HomeCardBrand>
          <HomeCardTitle>라이프스타일 가이드</HomeCardTitle>
          <HomeCardDescription>일상 속에서 찾는 스타일링 팁을 공유합니다.</HomeCardDescription>
          <HomeCardMetaRow>
            <Caption>2024.01.13</Caption>
            <Caption>조회수 2,345</Caption>
          </HomeCardMetaRow>
          <CTAButton>자세히 보기</CTAButton>
        </HomeCardBody>
      </HomeCard>
    </CardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 홈 카드 예시입니다. 가로 스크롤 리스트로 사용됩니다.',
      },
    },
  },
};

// ===== 이미지 없음 =====
export const WithoutImage: Story = {
  render: () => (
    <HomeCard>
      <HomeCardImage alt="이미지 없음" />
      <HomeCardBody>
        <HomeCardBrand>BRAND</HomeCardBrand>
        <HomeCardTitle>이미지 없는 카드</HomeCardTitle>
        <HomeCardDescription>이미지가 없을 때 플레이스홀더가 표시됩니다.</HomeCardDescription>
        <HomeCardMetaRow>
          <Caption>2024.01.15</Caption>
          <Caption>조회수 1,234</Caption>
        </HomeCardMetaRow>
        <CTAButton>자세히 보기</CTAButton>
      </HomeCardBody>
    </HomeCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '이미지가 없을 때 플레이스홀더가 표시됩니다.',
      },
    },
  },
};

// ===== 긴 텍스트 =====
export const LongText: Story = {
  render: () => (
    <HomeCard>
      <HomeCardImage src="https://via.placeholder.com/300x300" alt="긴 텍스트 카드" />
      <HomeCardBody>
        <HomeCardBrand>VERY LONG BRAND NAME</HomeCardBrand>
        <HomeCardTitle>매우 긴 제목이 여기에 표시되며 여러 줄에 걸쳐 표시될 수 있습니다</HomeCardTitle>
        <HomeCardDescription>
          매우 긴 설명이 여기에 표시됩니다. 이 설명은 두 줄까지만 표시되고 나머지는 말줄임표로 처리됩니다.
          추가 텍스트가 있어도 표시되지 않습니다.
        </HomeCardDescription>
        <HomeCardMetaRow>
          <Caption>2024.01.15</Caption>
          <Caption>조회수 1,234,567</Caption>
        </HomeCardMetaRow>
        <CTAButton>자세히 보기</CTAButton>
      </HomeCardBody>
    </HomeCard>
  ),
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 있는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

