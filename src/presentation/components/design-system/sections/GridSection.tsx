import React from 'react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';

const { grid } = theme;
const bp = grid.breakpoints;

export const GridSection: React.FC = () => (
  <Section>
    <SectionTitle>반응형 그리드 (Grid Columns)</SectionTitle>
    <SectionDescription>
      목록·카드 그리드는 <code>ContentCardGrid</code>를 사용합니다. gap은 {grid.gap}입니다.
    </SectionDescription>
    <List>
      <Item>
        <strong>mobile</strong> — {grid.columns.mobile}열 (가로 스크롤, {bp.mobileMin}~{bp.mobileMax})
      </Item>
      <Item>
        <strong>tablet</strong> — {grid.columns.tablet}열 ({bp.tabletMin}~{bp.tabletMax})
      </Item>
      <Item>
        <strong>desktop</strong> — {grid.columns.desktop}열 ({bp.wideMin}+)
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

  code {
    font-family: monospace;
    font-size: 0.9em;
  }
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
