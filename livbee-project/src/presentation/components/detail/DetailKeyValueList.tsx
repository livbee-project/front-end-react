import React from 'react';
import styled from 'styled-components';

export interface DetailKeyValueItem {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}

interface DetailKeyValueListProps {
  items: DetailKeyValueItem[];
  dense?: boolean;
}

export const DetailKeyValueList: React.FC<DetailKeyValueListProps> = ({ items, dense = false }) => (
  <List $dense={dense}>
    {items.map(({ label, value, icon }) => (
      <Item key={label}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <Content>
          <Label>{label}</Label>
          <Value>{value}</Value>
        </Content>
      </Item>
    ))}
  </List>
);

const List = styled.dl<{ $dense: boolean }>`
  display: grid;
  grid-template-columns: ${({ $dense }) => ($dense ? 'minmax(120px, 160px) 1fr' : 'minmax(140px, 200px) 1fr')};
  row-gap: ${({ theme }) => theme.spacing.sm};
  column-gap: ${({ theme }) => theme.spacing.md};
  margin: 0;
`;

const Item = styled.div`
  display: contents;
`;

const IconWrapper = styled.span`
  display: inline-flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Label = styled.dt`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const Value = styled.dd`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 600;
  line-height: 1.4;
  margin: 0;
`;

