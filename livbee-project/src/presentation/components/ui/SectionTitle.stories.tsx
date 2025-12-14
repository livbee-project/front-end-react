import type { Meta, StoryObj } from '@storybook/react';
import SectionTitle from '@/presentation/components/ui/SectionTitle';
import {
  SectionTitleMargins,
  SectionTitleUsageExamples,
  SectionTitleVariants,
  SectionTitleWithBullet,
} from '@/presentation/components/ui/SectionTitleStoryContent';

const meta: Meta<typeof SectionTitle> = {
  title: 'UI Components/SectionTitle',
  component: SectionTitle,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '섹션 제목 컴포넌트입니다. 다양한 variant와 bullet 옵션을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'subtitle', 'detail'],
      description: '제목 스타일 변형',
    },
    showBullet: {
      control: 'boolean',
      description: 'Bullet 표시 여부',
    },
    marginBottom: {
      control: 'text',
      description: '하단 마진',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  args: {
    children: '섹션 제목',
  },
};

export const Variants: Story = {
  render: () => <SectionTitleVariants />,
  parameters: {
    docs: {
      description: {
        story: '세 가지 variant 스타일입니다. Default는 일반 섹션, Subtitle은 부제목, Detail은 상세 페이지에 사용됩니다.',
      },
    },
  },
};

export const WithBullet: Story = {
  render: () => <SectionTitleWithBullet />,
  parameters: {
    docs: {
      description: {
        story: 'showBullet prop을 사용하면 제목 앞에 Primary 색상의 bullet이 표시됩니다.',
      },
    },
  },
};

export const DifferentMargins: Story = {
  render: () => <SectionTitleMargins />,
  parameters: {
    docs: {
      description: {
        story: 'marginBottom prop으로 하단 마진을 조절할 수 있습니다.',
      },
    },
  },
};

export const UsageExamples: Story = {
  render: () => <SectionTitleUsageExamples />,
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 다양한 페이지에서 섹션 제목으로 사용할 수 있습니다.',
      },
    },
  },
};

