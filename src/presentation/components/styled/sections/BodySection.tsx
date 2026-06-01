/**
 * 본문 섹션 컴포넌트
 */

import React from 'react';
import { P, PMuted, Small } from '@/presentation/components/styled/Typography';
import { StoryContainer, ComponentItem } from '@/presentation/components/styled/sections/StoryComponents';

export const BodySection: React.FC = () => (
  <StoryContainer title="본문 컴포넌트 (Body Text)">
    <ComponentItem
      label="<P> - 본문 텍스트"
      code="<P>본문 텍스트 내용</P>"
      detail="스타일: 300 14px/1.6"
    >
      <P>
        이것은 본문 텍스트입니다. 일반적인 문단 내용에 사용되며, 14px 크기의 Light 폰트를 사용합니다. 여러 줄의 텍스트가 있을 때 가독성을 위해
        적절한 줄 간격을 제공합니다.
      </P>
    </ComponentItem>
    <ComponentItem
      label="<PMuted> - 본문 텍스트 (보조 색상)"
      code="<PMuted>보조 색상 본문 텍스트</PMuted>"
      detail="스타일: 300 14px/1.6, Muted 색상"
    >
      <PMuted>이것은 보조 색상의 본문 텍스트입니다. 덜 중요한 정보나 설명 텍스트에 사용됩니다.</PMuted>
    </ComponentItem>
    <ComponentItem
      label="<Small> - 작은 본문"
      code="<Small>작은 본문 텍스트</Small>"
      detail="스타일: 300 13px/1.6"
    >
      <Small>이것은 작은 본문 텍스트입니다. 13px 크기로 일반 본문보다 작게 표시됩니다.</Small>
    </ComponentItem>
  </StoryContainer>
);

