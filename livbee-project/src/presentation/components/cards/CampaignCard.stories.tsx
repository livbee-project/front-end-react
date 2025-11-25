import type { Meta, StoryObj } from '@storybook/react';
import CampaignCard from './CampaignCard';
import styled from 'styled-components';
import React from 'react';

const meta: Meta<typeof CampaignCard> = {
  title: 'Cards/CampaignCard',
  component: CampaignCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '모집 공고 리스트 페이지 전용 카드 컴포넌트입니다. 브랜드명, 제목, 내용을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    brandName: {
      control: 'text',
      description: '브랜드명 (파란색 텍스트)',
    },
    title: {
      control: 'text',
      description: '공고 제목',
    },
    content: {
      control: 'text',
      description: '공고 내용',
    },
    onPress: {
      action: 'clicked',
      description: '카드 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CampaignCard>;

// ===== 기본 카드 =====
export const Default: Story = {
  args: {
    brandName: '브랜드명',
    title: '공고 제목',
    content: '공고 내용이 여기에 표시됩니다.',
  },
};

// ===== 다양한 예시 =====
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
`;

export const Examples: Story = {
  render: () => (
    <CardContainer>
      <CampaignCard
        brandName="패션 브랜드"
        title="2024 봄/여름 컬렉션 모델 모집"
        content="패션 쇼와 광고 촬영에 참여할 모델을 모집합니다."
        onPress={() => alert('카드 클릭')}
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
        onPress={() => alert('카드 클릭')}
      />
    </CardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 모집 공고 카드 예시입니다.',
      },
    },
  },
};

// ===== 긴 텍스트 =====
export const LongText: Story = {
  render: () => (
    <CardContainer>
      <CampaignCard
        brandName="매우 긴 브랜드명이 여기에 표시됩니다"
        title="매우 긴 공고 제목이 여기에 표시되며 텍스트가 길어지면 말줄임표로 처리됩니다"
        content="매우 긴 공고 내용이 여기에 표시됩니다. 이 내용은 여러 줄에 걸쳐 표시될 수 있으며, 텍스트가 길어지면 말줄임표로 처리됩니다."
        onPress={() => alert('카드 클릭')}
      />
    </CardContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 있는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

// ===== 리스트 예시 =====
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const ListExample: Story = {
  render: () => (
    <ListContainer>
      <CampaignCard
        brandName="패션 브랜드 A"
        title="2024 봄/여름 컬렉션 모델 모집"
        content="패션 쇼와 광고 촬영에 참여할 모델을 모집합니다."
        onPress={() => alert('카드 1 클릭')}
      />
      <CampaignCard
        brandName="뷰티 브랜드 B"
        title="화장품 광고 모델 모집"
        content="신제품 런칭 광고에 출연할 모델을 찾고 있습니다."
        onPress={() => alert('카드 2 클릭')}
      />
      <CampaignCard
        brandName="라이프스타일 브랜드 C"
        title="인플루언서 협업 모집"
        content="제품 리뷰 및 콘텐츠 제작에 참여할 인플루언서를 모집합니다."
        onPress={() => alert('카드 3 클릭')}
      />
    </ListContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '리스트 페이지에서 사용하는 예시입니다.',
      },
    },
  },
};

