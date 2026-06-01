import {
  aspectRatio,
  breakpoints,
  fontFamily,
  fontScale,
  gridColumns,
  layoutMaxWidth,
  palette,
  primaryMutedSurface,
  primaryOpacityLevels,
  radiusPx,
  spacingPx,
} from '@/presentation/styles/tokens';

/**
 * Hex 색상을 RGBA로 변환
 */
export const hexToRgba = (hex: string, alpha: number): string => {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const px = (n: number) => `${n}px`;

const buildFont = (key: keyof typeof fontScale) => {
  const { size, weight, lineHeight } = fontScale[key];
  return `${weight} ${px(size)}/${lineHeight} ${fontFamily}`;
};

const spacing = Object.fromEntries(
  Object.entries(spacingPx).map(([key, value]) => [key, px(value)]),
) as Record<keyof typeof spacingPx, string>;

const radii = {
  ...Object.fromEntries(Object.entries(radiusPx).map(([key, value]) => [key, px(value)])),
  full: '9999px',
} as Record<keyof typeof radiusPx | 'full', string>;

const primaryOpacity = Object.fromEntries(
  Object.entries(primaryOpacityLevels).map(([level, alpha]) => [
    level,
    hexToRgba(palette.primary, alpha),
  ]),
) as Record<keyof typeof primaryOpacityLevels, string>;

export const theme = {
  colors: {
    primary: palette.primary,
    primaryHover: palette.primaryHover,
    primaryForeground: palette.white,
    accent: palette.accent,
    secondary: primaryMutedSurface,
    secondaryForeground: palette.text,
    background: palette.background,
    surface: palette.surface,
    foreground: palette.text,
    text: palette.text,
    muted: palette.subText,
    subText: palette.subText,
    border: palette.border,
    card: palette.surface,
    inputBackground: '#F3F1F8',
    error: palette.error,
    errorForeground: palette.errorForeground,
  },
  primaryOpacity,
  spacing,
  radii,
  fonts: {
    family: fontFamily,
    h1: buildFont('h1'),
    h2: buildFont('h2'),
    h3: buildFont('h3'),
    body: buildFont('p1'),
    p1: buildFont('p1'),
    p2: buildFont('p2'),
    button: buildFont('p2'),
    caption: buildFont('caption'),
  },
  aspectRatio,
  grid: {
    columns: gridColumns,
    gap: spacing.lg,
  },
  input: {
    borderRadius: radii.lg,
    padding: `${spacing.md} ${spacing.lg}`,
    backgroundColor: '#F3F1F8',
    focusBorderColor: palette.primary,
    fontSize: '16px',
  },
  section: {
    paddingY: spacing['3xl'],
    paddingX: {
      mobile: spacing.lg,
      tablet: spacing.xl,
      desktop: spacing['2xl'],
    },
    gap: spacing.xl,
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    border: `1px solid ${palette.border}`,
    gap: spacing.md,
  },
  layout: {
    maxWidth: layoutMaxWidth,
    pagePadding: {
      mobile: spacing.lg,
      tablet: spacing.xl,
      desktop: spacing['2xl'],
    },
  },
  breakpoints,
  legacy: {
    spacing: {
      XS: spacing.xs,
      SM: spacing.sm,
      MD: spacing.md,
      LG: spacing.lg,
      XL: '20px',
      XXL: spacing.xl,
      XXXL: spacing['2xl'],
    },
    gap: {
      XS: spacing.xs,
      SM: spacing.sm,
      MD: spacing.sm,
      LG: spacing.md,
      XL: spacing.md,
      XXL: spacing.lg,
    },
    borderRadius: {
      SM: radii.sm,
      MD: radii.md,
      LG: radii.lg,
      XL: radii.xl,
      CIRCLE: '50%',
    },
    fontSize: {
      XS: px(fontScale.caption.size),
      SM: px(fontScale.p1.size),
      MD: px(fontScale.h3.size),
      LG: px(20),
      XL: px(fontScale.h2.size),
    },
    fontWeight: {
      NORMAL: 400,
      MEDIUM: 500,
      BOLD: 700,
    },
    textColor: {
      BLACK: palette.text,
      DARK_GRAY: palette.subText,
      PRIMARY: palette.primary,
      WHITE: palette.white,
    },
  },
};

export type AppTheme = typeof theme;
