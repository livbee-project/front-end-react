/**
 * 제목 섹션 컴포넌트
 */

import React from 'react';
import { H1, H2, H3 } from '../Typography';
import { StoryContainer, ComponentItem } from './StoryComponents';

export const HeadingsSection: React.FC = () => (
  <StoryContainer title="제목 컴포넌트 (Headings)">
    <ComponentItem
      label="<H1> - 페이지 타이틀"
      code="<H1>페이지 제목 (H1)</H1>"
      detail="스타일: 700 16px/1.4"
    >
      <H1>페이지 제목 (H1)</H1>
    </ComponentItem>
    <ComponentItem
      label="<H2> - 섹션 타이틀, 이름, 브랜드명"
      code="<H2>섹션 제목 (H2)</H2>"
      detail="스타일: 700 14px/1.4"
    >
      <H2>섹션 제목 (H2)</H2>
    </ComponentItem>
    <ComponentItem
      label="<H3> - 섹션 타이틀, 이름, 브랜드명"
      code="<H3>서브 제목 (H3)</H3>"
      detail="스타일: 700 14px/1.4"
    >
      <H3>서브 제목 (H3)</H3>
    </ComponentItem>
  </StoryContainer>
);

