import type { Meta, StoryObj } from '@storybook/react';
import MyClipCard from './MyClipCard';
import {
  MyClipCardDefaultArgs,
  MyClipCardList,
  MyClipCardLongTextArgs,
  MyClipCardWithoutButtonsArgs,
  MyClipCardWithoutImageArgs,
} from './MyClipCardStoryContent';

const meta: Meta<typeof MyClipCard> = {
  title: 'Cards/MyClipCard',
  component: MyClipCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '내 숏클립 페이지에서 사용되는 비디오 카드 컴포넌트입니다. 썸네일 이미지, 프로필 아이콘, 제목, 설명, 편집/삭제 버튼을 표시합니다.',
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
    onEdit: {
      action: 'edit clicked',
      description: '편집 버튼 클릭 시 실행될 함수',
    },
    onDelete: {
      action: 'delete clicked',
      description: '삭제 버튼 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyClipCard>;

export const Default: Story = {
  args: MyClipCardDefaultArgs,
  parameters: {
    docs: {
      description: {
        story: '기본 내 클립 카드입니다. 썸네일 이미지, 프로필 이미지, 제목, 설명, 편집/삭제 버튼이 표시됩니다.',
      },
    },
  },
};

export const WithoutImages: Story = {
  args: MyClipCardWithoutImageArgs,
  parameters: {
    docs: {
      description: {
        story: '이미지가 없는 경우 플레이스홀더가 표시됩니다.',
      },
    },
  },
};

export const LongText: Story = {
  args: MyClipCardLongTextArgs,
  parameters: {
    docs: {
      description: {
        story: '긴 텍스트가 들어가는 경우 말줄임표로 처리됩니다.',
      },
    },
  },
};

export const WithoutButtons: Story = {
  args: MyClipCardWithoutButtonsArgs,
  parameters: {
    docs: {
      description: {
        story: 'onEdit와 onDelete prop이 없으면 버튼이 표시되지 않습니다.',
      },
    },
  },
};

export const Variations: Story = {
  render: () => <MyClipCardList />,
  parameters: {
    docs: {
      description: {
        story: '다양한 상태의 내 클립 카드 예시입니다.',
      },
    },
  },
};

