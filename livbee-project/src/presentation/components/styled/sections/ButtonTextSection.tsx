/**
 * 버튼 텍스트 섹션 컴포넌트
 */

import React from 'react';
import { ButtonText } from '@/presentation/components/styled/Typography';
import { StoryContainer, ComponentItem } from '@/presentation/components/styled/sections/StoryComponents';

export const ButtonTextSection: React.FC = () => (
  <StoryContainer title="버튼 텍스트 (Button Text)">
    <ComponentItem
      label="<ButtonText> - 버튼 텍스트"
      code="<ButtonText>버튼 텍스트</ButtonText>"
      detail="스타일: 500 12px/1.4"
    >
      <ButtonText>버튼 텍스트</ButtonText>
    </ComponentItem>
  </StoryContainer>
);

