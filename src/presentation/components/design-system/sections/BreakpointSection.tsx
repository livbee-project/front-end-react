/**
 * 브레이크포인트 섹션 컴포넌트
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

export const BreakpointSection: React.FC = () => (
  <Section>
    <SectionTitle>반응형 브레이크포인트 (Breakpoints)</SectionTitle>
    <SectionDescription>반응형 디자인을 위한 화면 크기 기준점입니다. 미디어 쿼리에서 사용됩니다.</SectionDescription>
    <BreakpointGrid>
      {Object.entries(theme.breakpoints).map(([name, value]) => (
        <BreakpointItem key={name}>
          <BreakpointLabel>{name}</BreakpointLabel>
          <BreakpointValue>{value}</BreakpointValue>
        </BreakpointItem>
      ))}
    </BreakpointGrid>
  </Section>
);

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.foreground};
`;

const SectionDescription = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: 1.6;
`;

const BreakpointGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const BreakpointItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const BreakpointLabel = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};
`;

const BreakpointValue = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  font-family: monospace;
`;

