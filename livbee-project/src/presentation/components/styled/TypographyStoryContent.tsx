/**
 * TypographyStoryContent 컴포넌트
 * 타이포그래피 스토리 섹션들을 모아서 표시
 */

import React from 'react';
import { HeadingsSection } from '@/presentation/components/styled/sections/HeadingsSection';
import { BodySection } from '@/presentation/components/styled/sections/BodySection';
import { CaptionSection } from '@/presentation/components/styled/sections/CaptionSection';
import { ButtonTextSection } from '@/presentation/components/styled/sections/ButtonTextSection';
import { HighlightSection } from '@/presentation/components/styled/sections/HighlightSection';
import { UsageSection } from '@/presentation/components/styled/sections/UsageSection';

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
export { HeadingsSection } from '@/presentation/components/styled/sections/HeadingsSection';
export { BodySection } from '@/presentation/components/styled/sections/BodySection';
export { CaptionSection } from '@/presentation/components/styled/sections/CaptionSection';
export { ButtonTextSection } from '@/presentation/components/styled/sections/ButtonTextSection';
export { HighlightSection } from '@/presentation/components/styled/sections/HighlightSection';
export { UsageSection } from '@/presentation/components/styled/sections/UsageSection';

