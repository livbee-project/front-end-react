import React from 'react';
import styled from 'styled-components';
import { PMuted } from '@/presentation/components/styled/Typography';

export const AppInfo: React.FC = () => {
  return (
    <Container>
      <AppVersion as={PMuted}>버전 1.0.0</AppVersion>
      <AppLinks>
        <AppLink href="#" onClick={(e) => e.preventDefault()}>
          이용약관
        </AppLink>
        <span>·</span>
        <AppLink href="#" onClick={(e) => e.preventDefault()}>
          개인정보처리방침
        </AppLink>
      </AppLinks>
    </Container>
  );
};

const Container = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const AppVersion = styled(PMuted)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const AppLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  font: ${({ theme }) => theme.fonts.caption};
`;

const AppLink = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

