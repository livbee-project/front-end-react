import type { Meta, StoryObj } from '@storybook/react';
import { ColorsSection } from './sections/ColorsSection';
import { SpacingSection } from './sections/SpacingSection';
import { RadiusSection } from './sections/RadiusSection';
import { TypographySection } from './sections/TypographySection';
import { BreakpointSection } from './sections/BreakpointSection';

const meta: Meta = {
  title: 'Design System/Theme',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Livbee 프로젝트의 디자인 토큰 시스템입니다. 색상, 간격, 타이포그래피, 테두리 반경 등의 디자인 요소를 정의합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Colors: Story = {
  render: () => <ColorsSection />,
};

export const Spacing: Story = {
  render: () => <SpacingSection />,
};

export const BorderRadius: Story = {
  render: () => <RadiusSection />,
};

export const Typography: Story = {
  render: () => <TypographySection />,
};

export const Breakpoints: Story = {
  render: () => <BreakpointSection />,
};

