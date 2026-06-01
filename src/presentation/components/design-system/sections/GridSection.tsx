import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

export const GridSection: React.FC = () => (
  <Section>
    <SectionTitle>반응형 그리드 (Grid Columns)</SectionTitle>
    <SectionDescription>목록·카드 그리드 열 수입니다. gap은 {theme.grid.gap}입니다.</SectionDescription>
    <List>
      <Item>
        <strong>mobile</strong> — {theme.grid.columns.mobile}열
      </Item>
      <Item>
        <strong>tablet</strong> — {theme.grid.columns.tablet}열 (@media {theme.breakpoints.tablet}+)
      </Item>
      <Item>
        <strong>desktop</strong> — {theme.grid.columns.desktop}열 (@media {theme.breakpoints.desktop}+)
      </Item>
    </List>
  </Section>
);

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font: ${({ theme }) => theme.fonts.h2};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text};
`;

const SectionDescription = styled.p`
  font: ${({ theme }) => theme.fonts.p1};
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const List = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.xl};
  font: ${({ theme }) => theme.fonts.p1};
  color: ${({ theme }) => theme.colors.text};
`;

const Item = styled.li`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;
