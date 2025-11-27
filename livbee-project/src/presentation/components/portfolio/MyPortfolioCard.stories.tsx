import type { Meta, StoryObj } from '@storybook/react';
import { MyPortfolioCard } from './MyPortfolioCard';
import {
  DefaultPortfolioItem,
  PinnedDefaultPortfolioItem,
  NoImagePortfolioItem,
  MyPortfolioShowcase,
} from './MyPortfolioCardStoryContent';

const meta: Meta<typeof MyPortfolioCard> = {
  title: 'Cards/MyPortfolioCard',
  component: MyPortfolioCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '내 포트폴리오 목록에서 사용하는 카드입니다. 썸네일, 카테고리, 업데이트 날짜와 함께 즐겨찾기/기본/편집/삭제 액션을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    item: {
      control: 'object',
      description: '카드에 표시할 포트폴리오 데이터',
    },
    onCardClick: { action: 'card clicked' },
    onPinClick: { action: 'pin clicked' },
    onDefaultClick: { action: 'default clicked' },
    onEditClick: { action: 'edit clicked' },
    onDeleteClick: { action: 'delete clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof MyPortfolioCard>;

export const Default: Story = {
  args: DefaultPortfolioItem,
  parameters: {
    docs: {
      description: {
        story: '썸네일 이미지와 기본 정보를 보여주는 기본 카드입니다.',
      },
    },
  },
};

export const PinnedAndDefault: Story = {
  args: PinnedDefaultPortfolioItem,
  parameters: {
    docs: {
      description: {
        story: '핀과 기본 포트폴리오가 설정된 상태를 확인할 수 있습니다.',
      },
    },
  },
};

export const WithoutImage: Story = {
  args: NoImagePortfolioItem,
};

export const Showcase: Story = {
  render: () => <MyPortfolioShowcase />,
  parameters: {
    docs: {
      description: {
        story: '내 포트폴리오 목록에서 여러 카드를 나열한 예시입니다.',
      },
    },
  },
};


