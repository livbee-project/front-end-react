import type { Meta, StoryObj } from '@storybook/react';
import ListPageHint from './ListPageHint';

const meta: Meta<typeof ListPageHint> = {
  title: 'Lists/ListPageHint',
  component: ListPageHint,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '리스트 상단 혹은 하단에 안내 문구를 배치할 때 사용하는 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '표시할 안내 문구',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListPageHint>;

export const Default: Story = {
  args: {
    text: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: '기본 안내 문구를 표시합니다.',
      },
    },
  },
};

export const CustomText: Story = {
  args: {
    text: '포트폴리오 카드를 눌러 상세 정보를 확인하세요.',
  },
};


