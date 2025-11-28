/**
 * ThemeTokens 컴포넌트
 * 디자인 시스템 토큰 섹션들을 모아서 표시
 */

import React from 'react';
import { ColorsSection } from './sections/ColorsSection';
import { SpacingSection } from './sections/SpacingSection';
import { RadiusSection } from './sections/RadiusSection';
import { TypographySection } from './sections/TypographySection';
import { BreakpointSection } from './sections/BreakpointSection';

export const ThemeTokens: React.FC = () => (
  <>
    <ColorsSection />
    <SpacingSection />
    <RadiusSection />
    <TypographySection />
    <BreakpointSection />
  </>
);

