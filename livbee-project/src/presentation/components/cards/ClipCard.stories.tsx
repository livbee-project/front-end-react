import type { Meta, StoryObj } from '@storybook/react';
import ClipCard from './ClipCard';
import styled from 'styled-components';

const meta: Meta<typeof ClipCard> = {
  title: 'Cards/ClipCard',
  component: ClipCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '숏클립 페이지에서 사용되는 비디오 카드 컴포넌트입니다. 썸네일 이미지, 프로필 아이콘, 제목, 설명을 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      control: 'text',
      description: '비디오 썸네일 이미지 URL',
    },
    title: {
      control: 'text',
      description: '영상 제목',
    },
    description: {
      control: 'text',
      description: '영상 설명',
    },
    profileImageUrl: {
      control: 'text',
      description: '프로필 이미지 URL',
    },
    onClick: {
      action: 'clicked',
      description: '카드 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClipCard>;

const Container = styled.div`
  max-width: 400px;
`;

// ===== 기본 카드 =====
export const Default: Story = {
  render: (args) => (
    <Container>
      <ClipCard {...args} />
    </Container>
  ),
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    title: '봄 패션 아이템 소개',
    description: '봄 시즌에 어울리는 트렌디한 패션 아이템들을 소개합니다.',
    profileImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    onClick: () => alert('카드 클릭됨'),
  },
  parameters: {
    docs: {
      description: {
        story: '기본 클립 카드입니다. 썸네일 이미지, 프로필 이미지, 제목, 설명이 모두 표시됩니다.',
      },
    },
  },
};

// ===== 이미지 없음 =====
export const WithoutImages: Story = {
  render: (args) => (
    <Container>
      <ClipCard {...args} />
    </Container>
  ),
  args: {
    title: '라이브 쇼핑 영상',
    description: '실시간으로 진행되는 쇼핑 라이브 영상입니다.',
    onClick: () => alert('카드 클릭됨'),
  },
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 경우 플레이스홀더가 표시됩니다.',
      },
    },
  },
};

// ===== 긴 텍스트 =====
export const LongText: Story = {
  render: (args) => (
    <Container>
      <ClipCard {...args} />
    </Container>
  ),
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    title: '매우 긴 제목이 들어가는 경우 어떻게 표시되는지 확인하는 예시입니다',
    description: '매우 긴 설명 텍스트가 들어가는 경우에도 텍스트가 잘리지 않고 말줄임표로 처리되어 표시됩니다. 이렇게 긴 텍스트가 들어가도 카드 레이아웃이 깨지지 않습니다.',
    profileImageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    onClick: () => alert('카드 클릭됨'),
  },
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 들어가는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

// ===== 클릭 불가 =====
export const NonClickable: Story = {
  render: (args) => (
    <Container>
      <ClipCard {...args} />
    </Container>
  ),
  args: {
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    title: '클릭 불가능한 카드',
    description: 'onClick이 없으면 클릭할 수 없습니다.',
  },
  parameters: {
    docs: {
      description: {
        story: 'onClick prop이 없으면 카드가 클릭 불가능한 상태가 됩니다.',
      },
    },
  },
};

// ===== 다양한 예시 =====
export const Variations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '400px' }}>
      <ClipCard
        imageUrl="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80"
        title="패션 라이브"
        description="봄 신상품 소개"
        profileImageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
        onClick={() => {}}
      />
      <ClipCard
        imageUrl="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
        title="뷰티 제품 리뷰"
        description="신제품 화장품 체험 후기"
        profileImageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
        onClick={() => {}}
      />
      <ClipCard
        title="라이브 쇼핑"
        description="실시간 쇼핑 라이브"
        onClick={() => {}}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 클립 카드 예시입니다.',
      },
    },
  },
};

