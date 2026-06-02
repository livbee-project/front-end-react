import React from 'react';
import { Heart, Play } from 'lucide-react';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';
import type { ContentCardProps } from '@/presentation/components/cards/content/contentCard.types';
import {
  BodyArea,
  CardArticle,
  EllipsisText,
  FavoriteButton,
  getContentCardAspectRatio,
  Heading,
  LikeRow,
  LiveBadge,
  MediaArea,
  MediaImage,
  MediaPlaceholder,
  PlayIconCircle,
  PlayOverlay,
  RatingRow,
  RatingText,
  StarIcon,
  Supplementary,
  TitleLine,
  MediaOverlayLayer,
  CardFooterArea,
} from '@/presentation/components/cards/content/ContentCard.styles';
import { useTheme } from 'styled-components';

const variantSupportsFavorite = (variant: ContentCardProps['variant']) =>
  variant === 'showhost' || variant === 'ad' || variant === 'flip';

const showsPlayOverlay = (variant: ContentCardProps['variant']) =>
  variant === 'news' || variant === 'flip';

export const ContentCard: React.FC<ContentCardProps> = ({
  variant,
  imageUrl,
  imageAlt = '',
  heading,
  title,
  supplementary,
  flipEngagement,
  rating,
  mediaOverlay,
  footer,
  isFavorite = false,
  onFavoriteToggle,
  onClick,
  className,
}) => {
  const theme = useTheme();
  const aspectRatio = getContentCardAspectRatio(variant, theme);

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onFavoriteToggle?.(event);
  };

  return (
    <CardArticle
      className={className}
      $clickable={Boolean(onClick)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <MediaArea $aspectRatio={aspectRatio}>
        {imageUrl ? (
          <MediaImage src={imageUrl} alt={imageAlt || heading} loading="lazy" decoding="async" />
        ) : (
          <MediaPlaceholder>
            <PlaceholderImage size={40} />
          </MediaPlaceholder>
        )}

        {variant === 'live' && <LiveBadge>LIVE</LiveBadge>}

        {mediaOverlay && <MediaOverlayLayer>{mediaOverlay}</MediaOverlayLayer>}

        {variantSupportsFavorite(variant) && onFavoriteToggle && (
          <FavoriteButton
            type="button"
            aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기'}
            aria-pressed={isFavorite}
            $active={isFavorite}
            onClick={handleFavoriteClick}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </FavoriteButton>
        )}

        {showsPlayOverlay(variant) && (
          <PlayOverlay aria-hidden>
            <PlayIconCircle>
              <Play size={22} fill="currentColor" strokeWidth={0} />
            </PlayIconCircle>
          </PlayOverlay>
        )}
      </MediaArea>

      <BodyArea>
        <EllipsisText>
          <Heading>{heading}</Heading>
        </EllipsisText>

        {variant === 'showhost' && rating && (
          <RatingRow>
            <StarIcon aria-hidden>★</StarIcon>
            <EllipsisText>
              <RatingText>{rating}</RatingText>
            </EllipsisText>
          </RatingRow>
        )}

        {variant === 'ad' && title && (
          <EllipsisText>
            <TitleLine>{title}</TitleLine>
          </EllipsisText>
        )}

        {variant === 'flip' && flipEngagement ? (
          <LikeRow>
            <Heart size={14} fill="currentColor" strokeWidth={0} />
            <span>{flipEngagement}</span>
          </LikeRow>
        ) : (
          supplementary && (
            <EllipsisText>
              <Supplementary>{supplementary}</Supplementary>
            </EllipsisText>
          )
        )}
      </BodyArea>

      {footer && <CardFooterArea>{footer}</CardFooterArea>}
    </CardArticle>
  );
};
