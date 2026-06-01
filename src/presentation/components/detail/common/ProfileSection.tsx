import React from 'react';
import styled from 'styled-components';
import { ExternalLink } from 'lucide-react';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';
import { H1, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';

import type { ProfileSectionProps as BaseProfileSectionProps } from '@/types/components';

/**
 * ProfileSection 컴포넌트가 받을 props 타입을 정의합니다.
 * @param categories - 카테고리 배열 (선택)
 * @param tags - 태그 배열 (예: ['키 168cm', '사이즈 55', '경력 5년'])
 * @param websiteUrl - 웹사이트 URL (선택)
 * @param onImageClick - 프로필 이미지 클릭 시 실행될 함수 (선택)
 */
interface ProfileSectionProps extends BaseProfileSectionProps {
  categories?: string[];
  tags?: string[];
  websiteUrl?: string | null;
  onImageClick?: () => void;
}

const Section = styled.section`
  max-width: 672px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ProfileImageContainer = styled.div<{ $hasClick: boolean }>`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
  overflow: hidden;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

const Name = styled(H1)`
  color: ${({ theme }) => theme.colors.foreground};
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
`;

const TypeBadge = styled(Badge)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
`;

const CategoryBadge = styled(Badge)`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
`;

const Description = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const DetailedIntro = styled.div`
  color: ${({ theme }) => theme.colors.foreground};
  font: ${({ theme }) => theme.fonts.body};
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Tag = styled(Caption)`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.radii.md};
  white-space: nowrap;
`;

const WebsiteLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font: ${({ theme }) => theme.fonts.body};
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: opacity 0.2s;
  word-break: break-all;

  &:hover {
    opacity: 0.8;
  }
`;

/**
 * 상세 페이지 상단의 프로필 정보 섹션 컴포넌트입니다.
 * 이름, 타입 뱃지, 카테고리 뱃지, 설명, 태그, 웹사이트 링크를 표시합니다.
 */
const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  description,
  detailedIntro,
  profileImageUrl,
  type,
  categories = [],
  tags = [],
  websiteUrl,
  onImageClick,
}) => {
  return (
    <Section>
      <ProfileHeader>
        <ProfileImageContainer $hasClick={!!onImageClick} onClick={onImageClick}>
          {profileImageUrl ? (
            <ProfileImage src={profileImageUrl} alt={name} loading="lazy" decoding="async" />
          ) : (
            <PlaceholderImage size={40} />
          )}
        </ProfileImageContainer>
        <ProfileInfo>
          <Name>{name}</Name>
          <BadgeContainer>
            <TypeBadge as="span">{type === 'showhost' ? '쇼호스트' : '모델'}</TypeBadge>
            {categories.map((category, index) => (
              <CategoryBadge key={index} as="span">{category}</CategoryBadge>
            ))}
          </BadgeContainer>
          {description && <Description>{description}</Description>}
        </ProfileInfo>
      </ProfileHeader>

      {detailedIntro && (
        <DetailedIntro dangerouslySetInnerHTML={{ __html: detailedIntro }} />
      )}

      {tags.length > 0 && (
        <TagsContainer>
          {tags.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      )}

      {websiteUrl && (
        <WebsiteLink href={websiteUrl} target="_blank" rel="noopener noreferrer">
          <ExternalLink size={16} />
          <span>{websiteUrl}</span>
        </WebsiteLink>
      )}
    </Section>
  );
};

export default ProfileSection;
