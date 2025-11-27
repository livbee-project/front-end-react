import type { Meta, StoryObj } from '@storybook/react';
import RecruitCard from './RecruitCard';
import {
  RecruitCardBottomVariations,
  RecruitCardDefaultArgs,
  RecruitCardLongTextArgs,
  RecruitCardNonClickableArgs,
  RecruitCardScroll,
  RecruitCardWithoutImageArgs,
} from './RecruitCardStoryContent';

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

// ===== 기본 카드 =====
export const Default: Story = {
  render: (args) => (
    <RecruitCardScroll>
      <RecruitCard {...args} />
    </RecruitCardScroll>
  ),
  args: RecruitCardDefaultArgs,
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
    <RecruitCardScroll>
      <RecruitCard {...args} />
    </RecruitCardScroll>
  ),
  args: RecruitCardWithoutImageArgs,
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
    <RecruitCardScroll>
      <RecruitCard {...args} />
    </RecruitCardScroll>
  ),
  args: RecruitCardLongTextArgs,
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
  render: () => <RecruitCardBottomVariations />,
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
    <RecruitCardScroll>
      <RecruitCard {...args} />
    </RecruitCardScroll>
  ),
  args: RecruitCardNonClickableArgs,
  parameters: {
    docs: {
      description: {
        story: 'onPress prop이 없으면 카드가 클릭 불가능한 상태가 됩니다.',
      },
    },
  },
};

