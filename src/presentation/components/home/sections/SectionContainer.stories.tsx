import type { Meta, StoryObj } from '@storybook/react';
import SectionContainer from '@/presentation/components/home/sections/SectionContainer';
import PortraitCard from '@/presentation/components/cards/PortraitCard';
import styled from 'styled-components';

const meta: Meta<typeof SectionContainer> = {
  title: 'Layouts/SectionContainer',
  component: SectionContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '홈 화면의 각 섹션(헤더 + 컨텐츠)을 감싸는 공통 컨테이너 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '섹션 제목',
    },
    onMorePressed: {
      action: 'more clicked',
      description: '더보기 버튼 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionContainer>;

// ===== 기본 섹션 =====
const ContentArea = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.md};
  
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

export const Default: Story = {
  args: {
    title: '섹션 제목',
    children: (
      <ContentArea>
        <div style={{ padding: '20px', backgroundColor: '#f5f6ff', borderRadius: '8px', minWidth: '200px' }}>
          컨텐츠 1
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f5f6ff', borderRadius: '8px', minWidth: '200px' }}>
          컨텐츠 2
        </div>
        <div style={{ padding: '20px', backgroundColor: '#f5f6ff', borderRadius: '8px', minWidth: '200px' }}>
          컨텐츠 3
        </div>
      </ContentArea>
    ),
  },
};

// ===== 더보기 버튼 포함 =====
export const WithMoreButton: Story = {
  args: {
    title: '컨셉에 맞는 모델 찾기',
    onMorePressed: () => alert('더보기 클릭'),
    children: (
      <ContentArea>
        <PortraitCard title="모델 1" content="한 줄 소개" />
        <PortraitCard title="모델 2" content="한 줄 소개" />
        <PortraitCard title="모델 3" content="한 줄 소개" />
        <PortraitCard title="모델 4" content="한 줄 소개" />
      </ContentArea>
    ),
  },
};

// ===== 다양한 섹션 =====
export const DifferentSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <SectionContainer
        title="지금 뜨는 쇼핑라이브"
        onMorePressed={() => alert('더보기 클릭')}
      >
        <ContentArea>
          <PortraitCard title="라이브 1" content="방송 중" />
          <PortraitCard title="라이브 2" content="방송 중" />
          <PortraitCard title="라이브 3" content="방송 중" />
        </ContentArea>
      </SectionContainer>
      
      <SectionContainer
        title="브랜드 PICK"
        onMorePressed={() => alert('더보기 클릭')}
      >
        <ContentArea>
          <PortraitCard title="브랜드 1" content="추천 브랜드" />
          <PortraitCard title="브랜드 2" content="추천 브랜드" />
          <PortraitCard title="브랜드 3" content="추천 브랜드" />
        </ContentArea>
      </SectionContainer>
      
      <SectionContainer
        title="HOT CLIP"
        onMorePressed={() => alert('더보기 클릭')}
      >
        <ContentArea>
          <PortraitCard title="클립 1" content="인기 클립" />
          <PortraitCard title="클립 2" content="인기 클립" />
          <PortraitCard title="클립 3" content="인기 클립" />
        </ContentArea>
      </SectionContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 홈 섹션 예시입니다. 제목의 특정 부분이 Primary 색상으로 강조됩니다.',
      },
    },
  },
};

