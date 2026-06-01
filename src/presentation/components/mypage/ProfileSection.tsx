import React from 'react';
import styled from 'styled-components';
import { User } from 'lucide-react';
import { H2, H3, PMuted } from '@/presentation/components/styled/Typography';
import { PrimaryBadge } from '@/presentation/components/styled/CommonStyles';
import { Card } from '@/presentation/components/styled/SectionStyles';
import { maskPhoneNumber } from '@/shared/utils/formatUtils';
import { formatStatValue } from '@/shared/utils/mypageUtils';
import type { ProfileData } from '@/types/mypage';

interface ProfileSectionProps {
  profileData: ProfileData;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ profileData }) => {
  return (
    <ProfileCard>
      <ProfileHeader>
        <Avatar>
          <User size={40} strokeWidth={2} />
        </Avatar>
        <ProfileInfo>
          <ProfileName as={H2}>{profileData.name}</ProfileName>
          <ProfileRole as={PMuted}>{profileData.role}</ProfileRole>
          <ProfileBadges>
            {profileData.badges.map((badge) => (
              <SmallBadge key={badge} as={PrimaryBadge}>
                {badge}
              </SmallBadge>
            ))}
          </ProfileBadges>
          {profileData.contact && (
            <ProfileContact>
              연락처 {maskPhoneNumber(profileData.contact)}
            </ProfileContact>
          )}
        </ProfileInfo>
      </ProfileHeader>

      <StatsContainer>
        {profileData.stats.map((stat) => (
          <StatItem key={stat.label}>
            <StatLabel as={PMuted}>{stat.label}</StatLabel>
            <StatValue as={H3}>{formatStatValue(stat)}</StatValue>
          </StatItem>
        ))}
      </StatsContainer>
    </ProfileCard>
  );
};

const ProfileCard = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ProfileHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Avatar = styled.div`
  flex-shrink: 0;
  width: 5rem;
  height: 5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.primaryOpacity['60']} 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled(H2)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProfileRole = styled(PMuted)`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProfileContact = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
`;

const ProfileBadges = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const SmallBadge = styled(PrimaryBadge)``;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatLabel = styled(PMuted)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatValue = styled(H3)`
  color: ${({ theme }) => theme.colors.primary};
`;

