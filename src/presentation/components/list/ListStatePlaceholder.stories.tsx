import type { Meta, StoryObj } from '@storybook/react';
import { ListStatePlaceholder } from '@/presentation/components/list/ListStatePlaceholder';

const meta: Meta<typeof ListStatePlaceholder> = {
  title: 'Components/List/ListStatePlaceholder',
  component: ListStatePlaceholder,
  args: {
    data: [],
    loading: false,
    error: null,
    emptyMessage: '데이터가 없습니다.',
  },
};

export default meta;

type Story = StoryObj<typeof ListStatePlaceholder>;

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => (
    <ListStatePlaceholder {...args}>
      <div>목록 컨텐츠</div>
    </ListStatePlaceholder>
  ),
};

export const Error: Story = {
  args: {
    error: '데이터 로드 실패',
  },
  render: Loading.render,
};

export const Empty: Story = {
  args: {
    showEmptyState: true,
  },
  render: Loading.render,
};

export const Ready: Story = {
  args: {
    data: [{ id: 1 }],
  },
  render: Loading.render,
};

