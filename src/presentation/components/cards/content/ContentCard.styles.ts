import styled from 'styled-components';
import { H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { EllipsisText } from '@/presentation/components/styled/CommonStyles';
import type { ContentCardVariant } from '@/presentation/components/cards/content/contentCard.types';
import type { AppTheme } from '@/presentation/styles/theme';

const variantAspectRatio: Record<ContentCardVariant, keyof AppTheme['aspectRatio']> = {
  live: 'live',
  showhost: 'host',
  ad: 'ad',
  news: 'news',
  flip: 'flip',
};

export const getContentCardAspectRatio = (variant: ContentCardVariant, theme: AppTheme): string =>
  theme.aspectRatio[variantAspectRatio[variant]];

export const CardArticle = styled.article<{ $clickable: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  box-shadow: 0 1px 2px rgba(36, 33, 43, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: ${({ $clickable }) => ($clickable ? 'translateY(-2px)' : 'none')};
    box-shadow: ${({ $clickable }) =>
      $clickable ? '0 4px 12px rgba(36, 33, 43, 0.08)' : '0 1px 2px rgba(36, 33, 43, 0.06)'};
  }
`;

export const MediaArea = styled.div<{ $aspectRatio: string }>`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  background-color: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
`;

export const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const MediaPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.muted};
  font: ${({ theme }) => theme.fonts.caption};
`;

export const LiveBadge = styled.span`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.caption};
  font-weight: 700;
  letter-spacing: 0.02em;
`;

export const FavoriteButton = styled.button<{ $active: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ $active, theme }) => ($active ? theme.colors.error : theme.colors.muted)};
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

export const PlayOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(36, 33, 43, 0.2);
  pointer-events: none;
`;

export const PlayIconCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgba(255, 255, 255, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const BodyArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  min-width: 0;
`;

export const Heading = styled(H3)`
  font-weight: 700;
`;

export const TitleLine = styled(PMuted)``;

export const Supplementary = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

export const RatingText = styled(PMuted)`
  color: ${({ theme }) => theme.colors.foreground};
`;

export const StarIcon = styled.span`
  color: #f5a623;
  font-size: 14px;
  line-height: 1;
`;

export const LikeRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.muted};
  font: ${({ theme }) => theme.fonts.caption};
`;

export const MediaOverlayLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`;

export const CardFooterArea = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};
  min-width: 0;
`;

export const CardActionButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.button};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;

export { EllipsisText };
