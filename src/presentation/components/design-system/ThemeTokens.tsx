/**
 * ThemeTokens 컴포넌트
 * 디자인 시스템 토큰 섹션들을 모아서 표시
 */

import React from 'react';
import { ColorsSection } from '@/presentation/components/design-system/sections/ColorsSection';
import { SpacingSection } from '@/presentation/components/design-system/sections/SpacingSection';
import { RadiusSection } from '@/presentation/components/design-system/sections/RadiusSection';
import { TypographySection } from '@/presentation/components/design-system/sections/TypographySection';
import { BreakpointSection } from '@/presentation/components/design-system/sections/BreakpointSection';

export const ThemeTokens: React.FC = () => (
  <>
    <ColorsSection />
    <SpacingSection />
    <RadiusSection />
    <TypographySection />
    <BreakpointSection />
  </>
);

