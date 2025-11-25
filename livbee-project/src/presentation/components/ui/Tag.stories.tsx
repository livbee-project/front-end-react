import type { Meta, StoryObj } from '@storybook/react';
import Tag from './Tag';
import styled from 'styled-components';

const meta: Meta<typeof Tag> = {
  title: 'UI Components/Tag',
  component: Tag,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '정보 및 태그 섹션에서 사용되는 태그 컴포넌트입니다. 둥근 사각형 또는 원형 스타일을 지원합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '태그에 표시될 텍스트',
    },
    variant: {
      control: 'select',
      options: ['rounded', 'circle'],
      description: '태그 스타일 변형',
    },
    onClick: {
      action: 'clicked',
      description: '태그 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

// ===== 기본 태그 =====
export const Default: Story = {
  args: {
    label: '태그',
    variant: 'rounded',
  },
};

// ===== Variants =====
const VariantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const VariantRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

const VariantLabel = styled.div`
  min-width: 120px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Variants: Story = {
  render: () => (
    <VariantContainer>
      <VariantRow>
        <VariantLabel>Rounded</VariantLabel>
        <Tag label="태그1" variant="rounded" />
        <Tag label="태그2" variant="rounded" />
        <Tag label="긴 태그 이름" variant="rounded" />
      </VariantRow>
      <VariantRow>
        <VariantLabel>Circle</VariantLabel>
        <Tag label="A" variant="circle" />
        <Tag label="B" variant="circle" />
        <Tag label="CH" variant="circle" />
      </VariantRow>
    </VariantContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '태그의 두 가지 스타일 변형입니다. Rounded는 둥근 사각형, Circle은 원형입니다. Circle은 보통 1-2글자만 표시합니다.',
      },
    },
  },
};

// ===== 클릭 가능 =====
const ClickableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ClickableRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
`;

const ClickableLabel = styled.div`
  min-width: 150px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Clickable: Story = {
  render: () => (
    <ClickableContainer>
      <ClickableRow>
        <ClickableLabel>클릭 불가능</ClickableLabel>
        <Tag label="태그1" />
        <Tag label="태그2" />
        <Tag label="태그3" />
      </ClickableRow>
      <ClickableRow>
        <ClickableLabel>클릭 가능</ClickableLabel>
        <Tag label="태그1" onClick={() => alert('태그1 클릭')} />
        <Tag label="태그2" onClick={() => alert('태그2 클릭')} />
        <Tag label="태그3" onClick={() => alert('태그3 클릭')} />
      </ClickableRow>
    </ClickableContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'onClick prop을 전달하면 클릭 가능한 태그가 됩니다. 호버 시 시각적 피드백이 제공됩니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ExampleCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ExampleTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.foreground};
`;

const TagGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const UsageExamples: Story = {
  render: () => (
    <ExampleContainer>
      <ExampleCard>
        <ExampleTitle>카테고리 태그</ExampleTitle>
        <TagGroup>
          <Tag label="패션" />
          <Tag label="뷰티" />
          <Tag label="라이프스타일" />
          <Tag label="테크" />
        </TagGroup>
      </ExampleCard>
      <ExampleCard>
        <ExampleTitle>필터 태그 (클릭 가능)</ExampleTitle>
        <TagGroup>
          <Tag label="전체" onClick={() => {}} />
          <Tag label="인기순" onClick={() => {}} />
          <Tag label="최신순" onClick={() => {}} />
        </TagGroup>
      </ExampleCard>
      <ExampleCard>
        <ExampleTitle>브랜드 태그 (Circle)</ExampleTitle>
        <TagGroup>
          <Tag label="CH" variant="circle" />
          <Tag label="A" variant="circle" />
          <Tag label="B" variant="circle" />
        </TagGroup>
      </ExampleCard>
    </ExampleContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 카테고리, 필터, 브랜드 등 다양한 용도로 사용할 수 있습니다.',
      },
    },
  },
};

