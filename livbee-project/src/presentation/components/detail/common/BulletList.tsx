import React from 'react';
import styled from 'styled-components';
import { P } from '@/presentation/components/styled/Typography';

/**
 * BulletList 컴포넌트가 받을 props 타입을 정의합니다.
 * @param items - 불릿 리스트에 표시할 항목들의 배열
 * @param bullet - 불릿 문자 (기본값: "•")
 */
interface BulletListProps {
  items: string[];
  bullet?: string;
}

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 0;
  margin: 0;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Bullet = styled.span`
  flex-shrink: 0;
  margin-top: 2px;
`;

const ItemText = styled(P)`
  flex: 1;
`;

/**
 * 불릿 리스트를 표시하는 컴포넌트입니다.
 * 브랜드 소개, 담당 업무, 자격요건, 우대사항 등에 사용됩니다.
 */
const BulletList: React.FC<BulletListProps> = ({ items, bullet = '•' }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <Bullet>{bullet}</Bullet>
          <ItemText>{item}</ItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default BulletList;

