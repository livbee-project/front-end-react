import type { Meta, StoryObj } from '@storybook/react';
import RecruitCard from './RecruitCard';
import styled from 'styled-components';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';
import Button from '@/presentation/components/ui/Button';

const meta: Meta<typeof RecruitCard> = {
  title: 'Cards/RecruitCard',
  component: RecruitCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '쇼핑라이브 및 브랜드 픽 섹션에서 사용되는 공통 공고 카드 레이아웃 컴포넌트입니다. 상단과 하단 컨텐츠를 커스터마이징할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    topContent: {
      description: '카드의 상단 영역 (이미지, 뱃지 등)',
    },
    bottomContent: {
      description: '카드의 하단 영역 (상품 정보, 버튼 등)',
    },
    brandName: {
      control: 'text',
      description: '브랜드명',
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
      action: 'pressed',
      description: '카드 전체를 클릭했을 때 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecruitCard>;

const ScrollContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 100%;
`;

const TopImage = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-image: ${({ $imageUrl }) => ($imageUrl ? `url(${$imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// ===== 기본 카드 =====
export const Default: Story = {
  render: (args) => (
    <ScrollContainer>
      <RecruitCard {...args} />
    </ScrollContainer>
  ),
  args: {
    topContent: (
      <TopImage $imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" />
    ),
    bottomContent: (
      <Button variant="primary" fullWidth>
        지원하기
      </Button>
    ),
    brandName: '브랜드명',
    title: '2024 봄/여름 패션 라이브 쇼핑',
    content: '봄 시즌 신상품을 소개하는 라이브 쇼핑입니다.',
    onPress: () => alert('카드 클릭됨'),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 모집 카드입니다. 상단 이미지, 브랜드명, 제목, 내용, 하단 버튼이 표시됩니다.',
      },
    },
  },
};

// ===== 이미지 없음 =====
export const WithoutImage: Story = {
  render: (args) => (
    <ScrollContainer>
      <RecruitCard {...args} />
    </ScrollContainer>
  ),
  args: {
    topContent: (
      <TopImage>
        <PlaceholderImage size={64} />
      </TopImage>
    ),
    bottomContent: (
      <Button variant="primary" fullWidth>
        지원하기
      </Button>
    ),
    brandName: '브랜드명',
    title: '라이브 쇼핑 모집',
    content: '이미지가 없는 경우 플레이스홀더가 표시됩니다.',
    onPress: () => alert('카드 클릭됨'),
  },
  parameters: {
    docs: {
      description: {
        story: '상단 이미지가 없는 경우 플레이스홀더가 표시됩니다.',
      },
    },
  },
};

// ===== 긴 텍스트 =====
export const LongText: Story = {
  render: (args) => (
    <ScrollContainer>
      <RecruitCard {...args} />
    </ScrollContainer>
  ),
  args: {
    topContent: (
      <TopImage $imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" />
    ),
    bottomContent: (
      <Button variant="primary" fullWidth>
        지원하기
      </Button>
    ),
    brandName: '매우 긴 브랜드명이 들어가는 경우',
    title: '매우 긴 제목이 들어가는 경우 어떻게 표시되는지 확인하는 예시입니다',
    content: '매우 긴 설명 텍스트가 들어가는 경우에도 텍스트가 잘리지 않고 말줄임표로 처리되어 표시됩니다.',
    onPress: () => alert('카드 클릭됨'),
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 들어가는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

// ===== 다양한 하단 컨텐츠 =====
export const BottomContentVariations: Story = {
  render: () => (
    <ScrollContainer>
      <RecruitCard
        topContent={
          <TopImage $imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" />
        }
        bottomContent={
          <Button variant="primary" fullWidth>
            지원하기
          </Button>
        }
        brandName="브랜드 A"
        title="패션 라이브 쇼핑"
        content="봄 신상품 소개"
        onPress={() => {}}
      />
      <RecruitCard
        topContent={
          <TopImage $imageUrl="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80" />
        }
        bottomContent={
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="outline" style={{ flex: 1 }}>
              상세보기
            </Button>
            <Button variant="primary" style={{ flex: 1 }}>
              지원하기
            </Button>
          </div>
        }
        brandName="브랜드 B"
        title="뷰티 제품 리뷰"
        content="신제품 화장품 체험"
        onPress={() => {}}
      />
      <RecruitCard
        topContent={
          <TopImage $imageUrl="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80" />
        }
        bottomContent={
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '14px', color: '#666' }}>마감일: 2024.12.31</div>
            <Button variant="primary" fullWidth>
              지원하기
            </Button>
          </div>
        }
        brandName="브랜드 C"
        title="홈데코 아이템"
        content="인테리어 소품 소개"
        onPress={() => {}}
      />
    </ScrollContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 하단 컨텐츠를 커스터마이징할 수 있습니다.',
      },
    },
  },
};

// ===== 클릭 불가 =====
export const NonClickable: Story = {
  render: (args) => (
    <ScrollContainer>
      <RecruitCard {...args} />
    </ScrollContainer>
  ),
  args: {
    topContent: (
      <TopImage $imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" />
    ),
    bottomContent: (
      <Button variant="primary" fullWidth>
        지원하기
      </Button>
    ),
    brandName: '브랜드명',
    title: '클릭 불가능한 카드',
    content: 'onPress가 없으면 카드가 클릭 불가능한 상태가 됩니다.',
  },
  parameters: {
    docs: {
      description: {
        story: 'onPress prop이 없으면 카드가 클릭 불가능한 상태가 됩니다.',
      },
    },
  },
};

