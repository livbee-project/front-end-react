import React from 'react';
import styled from 'styled-components';
import type { ListContainerProps } from '@/types/components';

/**
 * 자식 컴포넌트들 '사이'에 구분선을 렌더링하는 세로 리스트 컨테이너입니다.
 * (구. DividedList)
 */
const VerticalList: React.FC<ListContainerProps> = ({
  children,
  showDividers = true, // (수정) 기본값을 true로 설정
}) => {
  const items = React.Children.toArray(children);

  return (
    <Container>
      {items.map((child, index) => (
        <React.Fragment key={index}>
          {child}
          {/*
            (수정) showDividers가 true이고, 마지막 아이템이 아닐 때만
            구분선을 렌더링합니다.
          */}
          {showDividers && index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const Divider = styled.hr`
  border: none;
  height: 0.3px;
  background-color: ${({ theme }) => theme.colors.border};
  margin: 0;
`;

export default VerticalList;