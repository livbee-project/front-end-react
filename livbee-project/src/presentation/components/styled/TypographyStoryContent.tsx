/**
 * TypographyStoryContent 컴포넌트
 * 타이포그래피 스토리 섹션들을 모아서 표시
 */

import React from 'react';
import { HeadingsSection } from './sections/HeadingsSection';
import { BodySection } from './sections/BodySection';
import { CaptionSection } from './sections/CaptionSection';
import { ButtonTextSection } from './sections/ButtonTextSection';
import { HighlightSection } from './sections/HighlightSection';
import { UsageSection } from './sections/UsageSection';

export const TypographyStoryContent: React.FC = () => (
  <>
    <HeadingsSection />
    <BodySection />
    <CaptionSection />
    <ButtonTextSection />
    <HighlightSection />
    <UsageSection />
  </>
);

// 개별 섹션 export (Storybook에서 사용)
export { HeadingsSection } from './sections/HeadingsSection';
export { BodySection } from './sections/BodySection';
export { CaptionSection } from './sections/CaptionSection';
export { ButtonTextSection } from './sections/ButtonTextSection';
export { HighlightSection } from './sections/HighlightSection';
export { UsageSection } from './sections/UsageSection';

