/**
 * 캡션 섹션 컴포넌트
 */

import React from 'react';
import { Caption, CaptionMedium } from '@/presentation/components/styled/Typography';
import { StoryContainer, ComponentItem } from '@/presentation/components/styled/sections/StoryComponents';

export const CaptionSection: React.FC = () => (
  <StoryContainer title="캡션 컴포넌트 (Captions)">
    <ComponentItem
      label="<Caption> - 캡션, 태그"
      code="<Caption>일반 캡션 텍스트</Caption>"
      detail="스타일: 300 12px/1.4"
    >
      <Caption>일반 캡션 텍스트</Caption>
    </ComponentItem>
    <ComponentItem
      label="<CaptionMedium> - 강조 캡션"
      code="<CaptionMedium>강조 캡션 텍스트</CaptionMedium>"
      detail="스타일: 500 12px/1.4"
    >
      <CaptionMedium>강조 캡션 텍스트</CaptionMedium>
    </ComponentItem>
  </StoryContainer>
);

