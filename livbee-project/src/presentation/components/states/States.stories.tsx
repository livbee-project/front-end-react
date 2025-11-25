import type { Meta, StoryObj } from '@storybook/react';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';
import styled from 'styled-components';
import React from 'react';

const meta: Meta = {
  title: 'UI Components/States',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '상태 컴포넌트입니다. 로딩, 빈 상태, 에러 상태를 표시합니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// ===== 로딩 상태 =====
const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const StateCard = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StateTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Loading: Story = {
  render: () => (
    <StateContainer>
      <div>
        <StateTitle>기본 로딩 상태</StateTitle>
        <StateCard>
          <LoadingState />
        </StateCard>
      </div>
      <div>
        <StateTitle>커스텀 메시지</StateTitle>
        <StateCard>
          <LoadingState message="데이터를 불러오는 중입니다..." />
        </StateCard>
      </div>
      <div>
        <StateTitle>커스텀 패딩</StateTitle>
        <StateCard>
          <LoadingState message="로딩 중..." padding="40px" />
        </StateCard>
      </div>
    </StateContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '로딩 상태 컴포넌트입니다. 데이터를 불러오는 중일 때 표시합니다.',
      },
    },
  },
};

// ===== 빈 상태 =====
export const Empty: Story = {
  render: () => (
    <StateContainer>
      <div>
        <StateTitle>기본 빈 상태</StateTitle>
        <StateCard>
          <EmptyState />
        </StateCard>
      </div>
      <div>
        <StateTitle>커스텀 메시지</StateTitle>
        <StateCard>
          <EmptyState message="등록된 모델이 없습니다." />
        </StateCard>
      </div>
      <div>
        <StateTitle>다양한 메시지</StateTitle>
        <StateCard>
          <EmptyState message="검색 결과가 없습니다." />
        </StateCard>
      </div>
    </StateContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '빈 상태 컴포넌트입니다. 데이터가 없을 때 표시합니다.',
      },
    },
  },
};

// ===== 에러 상태 =====
export const Error: Story = {
  render: () => (
    <StateContainer>
      <div>
        <StateTitle>기본 에러 상태</StateTitle>
        <StateCard>
          <ErrorState message="오류가 발생했습니다." />
        </StateCard>
      </div>
      <div>
        <StateTitle>재시도 버튼 포함</StateTitle>
        <StateCard>
          <ErrorState
            message="데이터를 불러오는 중 오류가 발생했습니다."
            onRetry={() => alert('다시 시도')}
          />
        </StateCard>
      </div>
      <div>
        <StateTitle>커스텀 재시도 라벨</StateTitle>
        <StateCard>
          <ErrorState
            message="네트워크 오류가 발생했습니다."
            onRetry={() => alert('새로고침')}
            retryLabel="새로고침"
          />
        </StateCard>
      </div>
    </StateContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '에러 상태 컴포넌트입니다. 오류가 발생했을 때 표시하며, 재시도 버튼을 포함할 수 있습니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const ExampleSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const ExampleSectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.foreground};
`;

export const UsageExamples: Story = {
  render: () => (
    <ExampleContainer>
      <ExampleSection>
        <ExampleSectionTitle>리스트 페이지 - 로딩 중</ExampleSectionTitle>
        <LoadingState message="목록을 불러오는 중입니다..." />
      </ExampleSection>
      <ExampleSection>
        <ExampleSectionTitle>리스트 페이지 - 빈 상태</ExampleSectionTitle>
        <EmptyState message="등록된 항목이 없습니다." />
      </ExampleSection>
      <ExampleSection>
        <ExampleSectionTitle>리스트 페이지 - 에러</ExampleSectionTitle>
        <ErrorState
          message="데이터를 불러오는 중 오류가 발생했습니다."
          onRetry={() => alert('다시 시도')}
        />
      </ExampleSection>
    </ExampleContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 리스트 페이지에서 다양한 상태를 표시할 때 사용합니다.',
      },
    },
  },
};

