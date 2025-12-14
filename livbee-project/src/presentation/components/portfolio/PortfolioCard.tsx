import React from 'react';
import styled, { css } from 'styled-components';
import { Star } from 'lucide-react';
import { H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';
import { Card } from '@/presentation/components/styled/SectionStyles';
import { buildPortfolioBadgeItems, formatExperience } from '@/shared/utils/badgeUtils';
import type { Portfolio } from '@/domain/entities/Portfolio';

interface PortfolioCardProps {
  portfolio: Portfolio;
  isScrapped: boolean;
  onCardClick: () => void;
  onScrapClick: (event: React.MouseEvent) => void;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({
  portfolio,
  isScrapped,
  onCardClick,
  onScrapClick,
}) => {
  return (
    <CardContainer onClick={onCardClick}>
      <TopSection>
        <ProfileImageContainer>
          {portfolio.mainThumbnailUrl ? (
            <ProfileImage src={portfolio.mainThumbnailUrl} alt={portfolio.nickname || '프로필'} loading="lazy" decoding="async" />
          ) : (
            <PlaceholderImage />
          )}
        </ProfileImageContainer>

        <HostContent>
          <HostNameRow>
            <HostName as={H3}>{portfolio.nickname || '이름 없음'}</HostName>
            <ScrapButton
              type="button"
              aria-label="스크랩"
              aria-pressed={isScrapped}
              onClick={onScrapClick}
            >
              <StyledStar size={16} $active={isScrapped} aria-hidden="true" />
            </ScrapButton>
          </HostNameRow>

          <HostIntro as={PMuted}>{portfolio.oneLineIntro || '소개 없음'}</HostIntro>
        </HostContent>
      </TopSection>

      <BadgeContainer>
        {buildPortfolioBadgeItems(portfolio).map((badge, index) => (
          <Badge key={`${portfolio.id}-${index}`} $variant="secondary" as="span">
            {badge}
          </Badge>
        ))}
        {portfolio.experienceYears != null && portfolio.experienceYears > 0 && (
          <InfoText as={Caption}>{formatExperience(portfolio.experienceYears)}</InfoText>
        )}
      </BadgeContainer>
    </CardContainer>
  );
};

const CardContainer = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
  cursor: pointer;
  transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 2px 8px ${({ theme }) => theme.primaryOpacity['10']};
    transform: translateY(-2px);
  }
`;

const TopSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProfileImageContainer = styled.div`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary};
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.secondary};
`;

const HostContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const HostNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const HostName = styled(H3)``;

const ScrapButton = styled.button`
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background-color 0.2s;
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.primaryOpacity['05']};
  }
`;

const StyledStar = styled(Star)<{ $active: boolean }>`
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  ${({ $active }) =>
    $active &&
    css`
      fill: ${({ theme }) => theme.colors.primary};
    `}
  transition: color 0.2s, fill 0.2s;
  ${ScrapButton}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HostIntro = styled(PMuted)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: nowrap;
  overflow-x: auto;
  align-items: center;
  min-width: 0;
  width: 100%;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const InfoText = styled(Caption)`
  white-space: nowrap;
  flex-shrink: 0;
`;

