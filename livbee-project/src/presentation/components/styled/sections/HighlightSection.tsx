/**
 * 강조 섹션 컴포넌트
 */

import React from 'react';
import { P, Highlight } from '../Typography';
import { StoryContainer, ComponentItem } from './StoryComponents';

export const HighlightSection: React.FC = () => (
  <StoryContainer title="강조 컴포넌트 (Highlight)">
    <ComponentItem
      label="<Highlight> - 강조 텍스트 (Primary 컬러)"
      code={`<P>
  일반 텍스트 <Highlight>강조 텍스트</Highlight>
</P>`}
      detail="Primary 색상으로 강조"
    >
      <P>
        이것은 일반 텍스트이고, <Highlight>이것은 강조된 텍스트</Highlight>입니다.
      </P>
    </ComponentItem>
  </StoryContainer>
);

