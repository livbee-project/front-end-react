import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';
import styled from 'styled-components';

const meta: Meta<typeof Button> = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '공통 버튼 컴포넌트입니다. 다양한 스타일(variant)과 크기(size)를 지원하며, 전체 너비 옵션과 비활성화 상태를 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: '버튼 스타일 변형',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼 크기',
    },
    fullWidth: {
      control: 'boolean',
      description: '전체 너비 사용 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ===== 기본 버튼 =====
export const Default: Story = {
  args: {
    children: '버튼',
    variant: 'primary',
    size: 'medium',
  },
};

// ===== Variants =====
const VariantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const VariantRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const VariantLabel = styled.div`
  min-width: 100px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Variants: Story = {
  render: () => (
    <VariantContainer>
      <VariantRow>
        <VariantLabel>Primary</VariantLabel>
        <Button variant="primary">Primary Button</Button>
      </VariantRow>
      <VariantRow>
        <VariantLabel>Secondary</VariantLabel>
        <Button variant="secondary">Secondary Button</Button>
      </VariantRow>
      <VariantRow>
        <VariantLabel>Outline</VariantLabel>
        <Button variant="outline">Outline Button</Button>
      </VariantRow>
    </VariantContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 세 가지 스타일 변형입니다. Primary는 주요 액션, Secondary는 보조 액션, Outline은 경계선이 있는 스타일입니다.',
      },
    },
  },
};

// ===== Sizes =====
const SizeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SizeRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const SizeLabel = styled.div`
  min-width: 100px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Sizes: Story = {
  render: () => (
    <SizeContainer>
      <SizeRow>
        <SizeLabel>Small</SizeLabel>
        <Button size="small">Small Button</Button>
      </SizeRow>
      <SizeRow>
        <SizeLabel>Medium</SizeLabel>
        <Button size="medium">Medium Button</Button>
      </SizeRow>
      <SizeRow>
        <SizeLabel>Large</SizeLabel>
        <Button size="large">Large Button</Button>
      </SizeRow>
    </SizeContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 세 가지 크기입니다. Small은 작은 공간에, Medium은 일반적인 용도에, Large는 강조가 필요한 경우에 사용합니다.',
      },
    },
  },
};

// ===== States =====
const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StateRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const StateLabel = styled.div`
  min-width: 150px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const States: Story = {
  render: () => (
    <StateContainer>
      <StateRow>
        <StateLabel>Default</StateLabel>
        <Button>Default Button</Button>
      </StateRow>
      <StateRow>
        <StateLabel>Disabled</StateLabel>
        <Button disabled>Disabled Button</Button>
      </StateRow>
      <StateRow>
        <StateLabel>Full Width</StateLabel>
        <Button fullWidth>Full Width Button</Button>
      </StateRow>
    </StateContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '버튼의 다양한 상태입니다. Disabled는 비활성화 상태, Full Width는 전체 너비를 차지합니다.',
      },
    },
  },
};

// ===== 조합 예시 =====
const CombinationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CombinationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const CombinationTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Combinations: Story = {
  render: () => (
    <CombinationGrid>
      <CombinationCard>
        <CombinationTitle>Primary Small</CombinationTitle>
        <Button variant="primary" size="small">작은 주요 버튼</Button>
      </CombinationCard>
      <CombinationCard>
        <CombinationTitle>Secondary Medium</CombinationTitle>
        <Button variant="secondary" size="medium">보조 버튼</Button>
      </CombinationCard>
      <CombinationCard>
        <CombinationTitle>Outline Large</CombinationTitle>
        <Button variant="outline" size="large">큰 경계선 버튼</Button>
      </CombinationCard>
      <CombinationCard>
        <CombinationTitle>Primary Disabled</CombinationTitle>
        <Button variant="primary" disabled>비활성화 버튼</Button>
      </CombinationCard>
    </CombinationGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 variant와 size의 조합 예시입니다.',
      },
    },
  },
};

