import type { Meta, StoryObj } from '@storybook/react';
import {
  BodySection,
  ButtonTextSection,
  CaptionSection,
  HeadingsSection,
  HighlightSection,
  UsageSection,
} from '@/presentation/components/styled/TypographyStoryContent';

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Livbee 프로젝트의 타이포그래피 컴포넌트 시스템입니다. 일관된 텍스트 스타일을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Headings: Story = { render: () => <HeadingsSection /> };
export const BodyText: Story = { render: () => <BodySection /> };
export const Captions: Story = { render: () => <CaptionSection /> };
export const ButtonTextComponent: Story = { render: () => <ButtonTextSection /> };
export const HighlightComponent: Story = { render: () => <HighlightSection /> };
export const UsageExamples: Story = { render: () => <UsageSection /> };

