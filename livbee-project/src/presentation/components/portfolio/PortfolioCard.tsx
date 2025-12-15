import React from 'react';
import styled, { css } from 'styled-components';
import { Star } from 'lucide-react';
import { H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';
import { Card } from '@/presentation/components/styled/SectionStyles';
import { formatExperience } from '@/shared/utils/badgeUtils';
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
      <ContentSection>
        {/* 왼쪽: 프로필 사진 + 태그 */}
        <LeftSection>
          <ProfileImageContainer>
            {portfolio.mainThumbnailUrl ? (
              <ProfileImage src={portfolio.mainThumbnailUrl} alt={portfolio.nickname || '프로필'} loading="lazy" decoding="async" />
            ) : (
              <PlaceholderImage />
            )}
          </ProfileImageContainer>
          <TagsContainer>
            <TagBadge $variant="secondary" as="span">패션</TagBadge>
            <TagBadge $variant="secondary" as="span">뷰티</TagBadge>
          </TagsContainer>
        </LeftSection>

        {/* 오른쪽: 이름, 한줄 소개, 경력 */}
        <RightSection>
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
          {portfolio.experienceYears != null && portfolio.experienceYears > 0 && (
            <ExperienceText as={Caption}>{formatExperience(portfolio.experienceYears)}</ExperienceText>
          )}
        </RightSection>
      </ContentSection>
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

const ContentSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const LeftSection = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
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

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

const TagBadge = styled(Badge)`
  width: fit-content;
`;

const RightSection = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: flex-start;
`;

const HostNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`;

const HostName = styled(H3)`
  text-align: left;
`;

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
  text-align: left;
  width: 100%;
`;

const ExperienceText = styled(Caption)`
  text-align: left;
  color: ${({ theme }) => theme.colors.muted};
`;

