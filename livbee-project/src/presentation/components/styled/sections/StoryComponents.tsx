/**
 * Storybook 공통 컴포넌트
 */

import React from 'react';
import styled from 'styled-components';

interface StoryContainerProps {
  title: string;
  children: React.ReactNode;
}

export const StoryContainer: React.FC<StoryContainerProps> = ({ title, children }) => (
  <Container>
    <Section>
      <SectionTitle>{title}</SectionTitle>
      <ComponentGrid>{children}</ComponentGrid>
    </Section>
  </Container>
);

interface ComponentItemProps {
  label?: string;
  code?: string;
  detail?: string;
  children: React.ReactNode;
}

export const ComponentItem: React.FC<ComponentItemProps> = ({ label, code, detail, children }) => (
  <ComponentWrapper>
    {label && <ComponentLabel>{label}</ComponentLabel>}
    {children}
    {code && <CodeBlock>{code}</CodeBlock>}
    {detail && <ComponentLabel>{detail}</ComponentLabel>}
  </ComponentWrapper>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing.xl};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.foreground};
`;

const ComponentGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ComponentWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

const ComponentLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-family: monospace;
`;

const CodeBlock = styled.pre`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 12px;
  overflow-x: auto;
  margin: ${({ theme }) => theme.spacing.md} 0;
  color: ${({ theme }) => theme.colors.foreground};
`;

