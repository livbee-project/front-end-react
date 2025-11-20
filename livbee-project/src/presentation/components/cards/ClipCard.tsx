import React from 'react';
import styled from 'styled-components';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';
import { H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { EllipsisText } from '@/presentation/components/styled/CommonStyles';

/**
 * ClipCard 컴포넌트가 받을 props 타입을 정의합니다.
 * @param imageUrl - 비디오 썸네일 이미지 URL (선택)
 * @param title - 영상 제목
 * @param description - 영상 설명
 * @param profileImageUrl - 프로필 이미지 URL (선택)
 * @param onClick - 카드 클릭 시 실행될 함수 (선택)
 */
interface ClipCardProps {
  imageUrl?: string;
  title: string;
  description: string;
  profileImageUrl?: string;
  onClick?: () => void;
}

const CardContainer = styled.div<{ $hasClick: boolean }>`
  width: 100%;
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
  box-sizing: border-box;
`;

const Thumbnail = styled.div<{ $hasImage: boolean; $imageUrl?: string }>`
  width: 100%;
  aspect-ratio: 16 / 9;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: ${({ $hasImage, theme }) => ($hasImage ? 'none' : `1px solid ${theme.colors.border}`)};
  background-image: ${({ $hasImage, $imageUrl }) => ($hasImage && $imageUrl ? `url(${$imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoArea = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ProfileImageContainer = styled.div<{ $hasImage: boolean }>`
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({ $hasImage, theme }) => ($hasImage ? 'none' : `1px solid ${theme.colors.border}`)};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfilePlaceholder = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const TextArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

const Title = styled(H3)`
  color: ${({ theme }) => theme.colors.foreground};
`;

const Description = styled(PMuted)``;

/**
 * 숏클립 페이지에서 사용되는 비디오 카드 컴포넌트입니다.
 * 썸네일 이미지, 프로필 아이콘, 제목, 설명을 표시합니다.
 */
const ClipCard: React.FC<ClipCardProps> = ({
  imageUrl,
  title,
  description,
  profileImageUrl,
  onClick,
}) => {
  return (
    <CardContainer $hasClick={!!onClick} onClick={onClick}>
      {/* 썸네일 이미지 */}
      <Thumbnail $hasImage={!!imageUrl} $imageUrl={imageUrl}>
        {!imageUrl && <PlaceholderImage size={48} />}
      </Thumbnail>

      {/* 정보 영역 */}
      <InfoArea>
        {/* 프로필 이미지 */}
        <ProfileImageContainer $hasImage={!!profileImageUrl}>
          {profileImageUrl ? (
            <ProfileImage src={profileImageUrl} alt="프로필" />
          ) : (
            <ProfilePlaceholder>P</ProfilePlaceholder>
          )}
        </ProfileImageContainer>

        {/* 텍스트 영역 */}
        <TextArea>
          <EllipsisText>
            <Title>{title}</Title>
          </EllipsisText>
          <EllipsisText>
            <Description>{description}</Description>
          </EllipsisText>
        </TextArea>
      </InfoArea>
    </CardContainer>
  );
};

export default ClipCard;

