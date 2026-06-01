import { cssVarNames, fontScale, palette, radiusPx, spacingPx } from '@/presentation/styles/tokens';
import { theme } from '@/presentation/styles/theme';

const px = (n: number) => `${n}px`;

/**
 * GlobalStyle :root에 주입할 CSS 변수 블록
 */
export const themeCssVariables = `
  ${cssVarNames.colorPrimary}: ${palette.primary};
  ${cssVarNames.colorPrimaryHover}: ${palette.primaryHover};
  ${cssVarNames.colorAccent}: ${palette.accent};
  ${cssVarNames.colorBackground}: ${palette.background};
  ${cssVarNames.colorSurface}: ${palette.surface};
  ${cssVarNames.colorText}: ${palette.text};
  ${cssVarNames.colorSubText}: ${palette.subText};
  ${cssVarNames.colorBorder}: ${palette.border};
  ${cssVarNames.colorError}: ${palette.error};
  ${cssVarNames.fontFamily}: ${theme.fonts.family};
  ${cssVarNames.fontH1}: ${theme.fonts.h1};
  ${cssVarNames.fontH2}: ${theme.fonts.h2};
  ${cssVarNames.fontH3}: ${theme.fonts.h3};
  ${cssVarNames.fontP1}: ${theme.fonts.p1};
  ${cssVarNames.fontP2}: ${theme.fonts.p2};
  ${cssVarNames.fontCaption}: ${theme.fonts.caption};
  ${cssVarNames.spaceXs}: ${px(spacingPx.xs)};
  ${cssVarNames.spaceSm}: ${px(spacingPx.sm)};
  ${cssVarNames.spaceMd}: ${px(spacingPx.md)};
  ${cssVarNames.spaceLg}: ${px(spacingPx.lg)};
  ${cssVarNames.spaceXl}: ${px(spacingPx.xl)};
  ${cssVarNames.space2xl}: ${px(spacingPx['2xl'])};
  ${cssVarNames.space3xl}: ${px(spacingPx['3xl'])};
  ${cssVarNames.space4xl}: ${px(spacingPx['4xl'])};
  ${cssVarNames.radiusSm}: ${px(radiusPx.sm)};
  ${cssVarNames.radiusMd}: ${px(radiusPx.md)};
  ${cssVarNames.radiusLg}: ${px(radiusPx.lg)};
  ${cssVarNames.radiusXl}: ${px(radiusPx.xl)};

  /* 레거시 CSS 변수 (global.css 호환) */
  --font-size-h1: ${px(fontScale.h1.size)};
  --h1: ${px(fontScale.h1.size)};
  --h2: ${px(fontScale.h2.size)};
  --h3: ${px(fontScale.h3.size)};
  --p: ${px(fontScale.p1.size)};
  --p2: ${px(fontScale.p2.size)};
  --ct: ${px(fontScale.caption.size)};
  --black: ${palette.text};
  --dark-gray: ${palette.subText};
  --primary: ${palette.primary};
  --slate-gray: ${palette.subText};
  --lavender-gray: ${palette.border};
  --paint-gray: ${palette.border};
  --light-gray: ${palette.background};
  --white: ${palette.surface};
  --placeholder-bg: ${theme.colors.inputBackground};
  --product-bg: ${theme.colors.secondary};
  --product-border: ${palette.border};
`;
