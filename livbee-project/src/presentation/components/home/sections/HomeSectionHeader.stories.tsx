import type { Meta, StoryObj } from '@storybook/react';
import HomeSectionHeader from './HomeSectionHeader';

const meta: Meta<typeof HomeSectionHeader> = {
  title: 'Sections/HomeSectionHeader',
  component: HomeSectionHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '홈 화면에서 섹션 제목과 “더보기” 버튼을 표시할 때 사용하는 헤더입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: '섹션 제목' },
    onMorePressed: { action: 'more clicked', description: '더보기 클릭 핸들러' },
  },
};

export default meta;
type Story = StoryObj<typeof HomeSectionHeader>;

export const Highlighted: Story = {
  args: {
    title: '지금 뜨는 쇼핑라이브',
  },
  parameters: {
    docs: {
      description: {
        story: 'highlightMap에 등록된 텍스트는 메인 컬러로 강조됩니다.',
      },
    },
  },
};

export const WithoutHighlight: Story = {
  args: {
    title: '추천 섹션',
  },
};


