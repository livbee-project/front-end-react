/**
 * 사용 예시 섹션 컴포넌트
 */

import React from 'react';
import styled from 'styled-components';
import { H1, H2, H3, P, PMuted, Small, Caption, ButtonText, Highlight } from '@/presentation/components/styled/Typography';
import { StoryContainer, ComponentItem } from '@/presentation/components/styled/sections/StoryComponents';

export const UsageSection: React.FC = () => (
  <StoryContainer title="실제 사용 예시">
    <ComponentItem>
      <H1>카드 제목</H1>
      <PMuted style={{ marginTop: '8px' }}>이것은 카드의 설명 텍스트입니다. 보조 정보를 제공합니다.</PMuted>
      <TagList>
        <Caption>태그1</Caption>
        <Caption>태그2</Caption>
        <Caption>태그3</Caption>
      </TagList>
    </ComponentItem>

    <ComponentItem>
      <H2>섹션 제목</H2>
      <P style={{ marginTop: '8px' }}>
        본문 내용이 여기에 표시됩니다. 여러 줄의 텍스트가 있을 수 있으며, 적절한 줄 간격으로 가독성을 유지합니다.
      </P>
      <Small style={{ marginTop: '12px' }}>작은 설명 텍스트</Small>
    </ComponentItem>

    <ComponentItem>
      <H3>브랜드명</H3>
      <P style={{ marginTop: '8px' }}>
        가격: <Highlight>29,000원</Highlight>
      </P>
      <ButtonText style={{ marginTop: '12px' }}>구매하기</ButtonText>
    </ComponentItem>
  </StoryContainer>
);

const TagList = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

