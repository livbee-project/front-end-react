import React from 'react';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';
import Button from '@/presentation/components/ui/Button';
import { GAP, FONT_SIZE, FONT_WEIGHT, TEXT_COLOR, BACKGROUND_COLOR, ELLIPSIS_TEXT, BORDER_RADIUS, SPACING } from '@/presentation/styles/constants';

/**
 * MyClipCard 컴포넌트가 받을 props 타입을 정의합니다.
 * @param imageUrl - 비디오 썸네일 이미지 URL (선택)
 * @param title - 영상 제목
 * @param description - 영상 설명
 * @param profileImageUrl - 프로필 이미지 URL (선택)
 * @param onEdit - 편집 버튼 클릭 시 실행될 함수 (선택)
 * @param onDelete - 삭제 버튼 클릭 시 실행될 함수 (선택)
 */
interface MyClipCardProps {
  imageUrl?: string;
  title: string;
  description: string;
  profileImageUrl?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

/**
 * 내 숏클립 페이지에서 사용되는 비디오 카드 컴포넌트입니다.
 * 썸네일 이미지, 프로필 아이콘, 제목, 설명, 편집/삭제 버튼을 표시합니다.
 */
const MyClipCard: React.FC<MyClipCardProps> = ({
  imageUrl,
  title,
  description,
  profileImageUrl,
  onEdit,
  onDelete,
}) => {
  /**
   * 카드 컨테이너 스타일
   */
  const cardStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
  };

  /**
   * 썸네일 이미지 영역 스타일
   */
  const thumbnailStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '16 / 9', // 일반적인 비디오 비율
    backgroundColor: BACKGROUND_COLOR.PLACEHOLDER,
    borderRadius: BORDER_RADIUS.MD,
    border: imageUrl ? 'none' : `1px solid ${TEXT_COLOR.DARK_GRAY}`,
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: SPACING.MD,
  };

  /**
   * 정보 영역 스타일
   */
  const infoStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: GAP.MD,
    marginBottom: SPACING.MD,
  };

  /**
   * 프로필 이미지 컨테이너 스타일
   */
  const profileImageStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    flexShrink: 0,
    borderRadius: BORDER_RADIUS.CIRCLE,
    backgroundColor: BACKGROUND_COLOR.PLACEHOLDER,
    border: profileImageUrl ? 'none' : `1px solid ${TEXT_COLOR.DARK_GRAY}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  /**
   * 텍스트 영역 스타일
   */
  const textAreaStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: GAP.XS,
    minWidth: 0,
  };

  /**
   * 제목 스타일
   */
  const titleStyle: React.CSSProperties = {
    fontWeight: FONT_WEIGHT.BOLD,
    fontSize: FONT_SIZE.MD,
    color: TEXT_COLOR.BLACK,
    ...ELLIPSIS_TEXT,
  };

  /**
   * 설명 스타일
   */
  const descriptionStyle: React.CSSProperties = {
    fontWeight: FONT_WEIGHT.NORMAL,
    fontSize: FONT_SIZE.XS,
    color: TEXT_COLOR.DARK_GRAY,
    ...ELLIPSIS_TEXT,
  };

  /**
   * 버튼 컨테이너 스타일
   */
  const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: GAP.MD,
    width: '100%',
  };

  return (
    <div style={cardStyle}>
      {/* 썸네일 이미지 */}
      <div style={thumbnailStyle}>
        {!imageUrl && <PlaceholderImage size={48} />}
      </div>

      {/* 정보 영역 */}
      <div style={infoStyle}>
        {/* 프로필 이미지 */}
        <div style={profileImageStyle}>
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt="프로필"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <span style={{ fontSize: FONT_SIZE.XS, color: TEXT_COLOR.DARK_GRAY }}>P</span>
          )}
        </div>

        {/* 텍스트 영역 */}
        <div style={textAreaStyle}>
          <span style={titleStyle}>{title}</span>
          <span style={descriptionStyle}>{description}</span>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div style={buttonContainerStyle}>
        <Button
          variant="outline"
          onClick={onEdit}
          style={{ flex: 1 }}
        >
          편집
        </Button>
        <Button
          variant="primary"
          onClick={onDelete}
          style={{ flex: 1 }}
        >
          삭제
        </Button>
      </div>
    </div>
  );
};

export default MyClipCard;

