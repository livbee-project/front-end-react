import React from 'react';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';

/**
 * ProfileSection 컴포넌트가 받을 props 타입을 정의합니다.
 * @param name - 프로필 이름
 * @param description - 프로필 설명 텍스트
 * @param profileImageUrl - 프로필 이미지 URL (선택)
 * @param onImageClick - 프로필 이미지 클릭 시 실행될 함수 (선택)
 */
interface ProfileSectionProps {
  name: string;
  description: string;
  profileImageUrl?: string;
  onImageClick?: () => void;
}

/**
 * 상세 페이지 상단의 프로필 정보 섹션 컴포넌트입니다.
 * 이름, 설명, 프로필 이미지를 표시합니다.
 * 모델 상세 페이지와 포트폴리오 상세 페이지에서 공통으로 사용됩니다.
 */
const ProfileSection: React.FC<ProfileSectionProps> = ({
  name,
  description,
  profileImageUrl,
  onImageClick,
}) => {
  /**
   * 섹션 컨테이너 스타일
   * 하단 구분선을 포함합니다.
   */
  const sectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '16px',
    borderBottom: '1px solid #F7F8FA',
    gap: '16px',
  };

  /**
   * 텍스트 영역 스타일
   * 왼쪽에 위치하며 flex: 1로 남은 공간을 차지합니다.
   */
  const textAreaStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    minWidth: 0,
  };

  /**
   * 이름 스타일
   */
  const nameStyle: React.CSSProperties = {
    fontSize: 'var(--h1)',
    fontWeight: 700,
    color: 'var(--black)',
    lineHeight: 1.4,
  };

  /**
   * 설명 스타일
   */
  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--p2)',
    fontWeight: 400,
    color: 'var(--dark-gray)',
    lineHeight: 1.5,
  };

  /**
   * 프로필 이미지 컨테이너 스타일
   * 원형 이미지를 표시합니다.
   */
  const imageContainerStyle: React.CSSProperties = {
    width: '120px',
    height: '120px',
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: '#F7F8FA',
    border: '1px solid #ECEFF1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: onImageClick ? 'pointer' : 'default',
    overflow: 'hidden',
    position: 'relative',
  };

  /**
   * 프로필 이미지 스타일
   */
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return (
    <div style={sectionStyle}>
      {/* 텍스트 영역 (왼쪽) */}
      <div style={textAreaStyle}>
        <h1 style={nameStyle}>{name}</h1>
        <p style={descriptionStyle}>{description}</p>
      </div>

      {/* 프로필 이미지 (오른쪽) */}
      <div style={imageContainerStyle} onClick={onImageClick}>
        {profileImageUrl ? (
          <img src={profileImageUrl} alt={name} style={imageStyle} />
        ) : (
          <PlaceholderImage size={48} />
        )}
      </div>
    </div>
  );
};

export default ProfileSection;

