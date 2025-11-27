import React from 'react';
import styled from 'styled-components';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';
import { ErrorState } from './ErrorState';

export const LoadingStatesSection: React.FC = () => (
  <StateContainer>
    <StateBlock title="기본 로딩 상태">
      <LoadingState />
    </StateBlock>
    <StateBlock title="커스텀 메시지">
      <LoadingState message="데이터를 불러오는 중입니다..." />
    </StateBlock>
    <StateBlock title="커스텀 패딩">
      <LoadingState message="로딩 중..." padding="40px" />
    </StateBlock>
  </StateContainer>
);

export const EmptyStatesSection: React.FC = () => (
  <StateContainer>
    <StateBlock title="기본 빈 상태">
      <EmptyState />
    </StateBlock>
    <StateBlock title="커스텀 메시지">
      <EmptyState message="등록된 모델이 없습니다." />
    </StateBlock>
    <StateBlock title="다양한 메시지">
      <EmptyState message="검색 결과가 없습니다." />
    </StateBlock>
  </StateContainer>
);

export const ErrorStatesSection: React.FC = () => (
  <StateContainer>
    <StateBlock title="기본 에러 상태">
      <ErrorState message="오류가 발생했습니다." />
    </StateBlock>
    <StateBlock title="재시도 버튼 포함">
      <ErrorState message="데이터를 불러오는 중 오류가 발생했습니다." onRetry={() => alert('다시 시도')} />
    </StateBlock>
    <StateBlock title="커스텀 재시도 라벨">
      <ErrorState
        message="네트워크 오류가 발생했습니다."
        onRetry={() => alert('새로고침')}
        retryLabel="새로고침"
      />
    </StateBlock>
  </StateContainer>
);

export const StatesUsageExamples: React.FC = () => (
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
      <ErrorState message="데이터를 불러오는 중 오류가 발생했습니다." onRetry={() => alert('다시 시도')} />
    </ExampleSection>
  </ExampleContainer>
);

interface StateBlockProps {
  title: string;
  children: React.ReactNode;
}

const StateBlock: React.FC<StateBlockProps> = ({ title, children }) => (
  <div>
    <StateTitle>{title}</StateTitle>
    <StateCard>{children}</StateCard>
  </div>
);

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

