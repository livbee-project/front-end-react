import React from 'react';

/**
 * ModelProfileSection 컴포넌트가 받을 props 타입을 정의합니다.
 * @param name - 모델 이름
 * @param description - 모델 설명 텍스트
 * @param profileImageUrl - 프로필 이미지 URL (선택)
 * @param onImageClick - 프로필 이미지 클릭 시 실행될 함수 (선택)
 */
interface ModelProfileSectionProps {
  name: string;
  description: string;
  profileImageUrl?: string;
  onImageClick?: () => void;
}

/**
 * 모델 상세 페이지 상단의 프로필 정보 섹션 컴포넌트입니다.
 * 모델 이름, 설명, 프로필 이미지를 표시합니다.
 */
const ModelProfileSection: React.FC<ModelProfileSectionProps> = ({
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
    minWidth: 0, // 텍스트 말줄임표를 위한 설정
  };

  /**
   * 모델 이름 스타일
   */
  const nameStyle: React.CSSProperties = {
    fontSize: 'var(--h1)', // 20px
    fontWeight: 700,
    color: 'var(--black)',
    lineHeight: 1.4,
  };

  /**
   * 모델 설명 스타일
   */
  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--p2)', // 14px
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

  /**
   * 플레이스홀더 아이콘 스타일
   * 이미지가 없을 때 표시됩니다.
   */
  const placeholderStyle: React.CSSProperties = {
    width: '48px',
    height: '48px',
    color: 'var(--dark-gray)',
    opacity: 0.5,
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
          <svg
            style={placeholderStyle}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ModelProfileSection;

