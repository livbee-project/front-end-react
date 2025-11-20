import React from 'react';
import styled from 'styled-components';
import { Caption } from '@/presentation/components/styled/Typography';

/**
 * ListPageHint 컴포넌트가 받을 props 타입을 정의합니다.
 * @param text - 안내 문구 텍스트 (기본값: '카드를 누르면 상세 정보를 보실 수 있습니다.')
 */
interface ListPageHintProps {
  text?: string;
}

/**
 * 리스트 페이지의 안내 문구 컴포넌트입니다.
 * 일관된 스타일과 위치를 제공합니다.
 */
const ListPageHint: React.FC<ListPageHintProps> = ({
  text = '카드를 누르면 상세 정보를 보실 수 있습니다.',
}) => {
  return <HintText>{text}</HintText>;
};

const HintText = styled(Caption)`
  margin-block-start: ${({ theme }) => theme.spacing['4xl']};
  margin-block-end: 0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.muted};
`;

export default ListPageHint;

