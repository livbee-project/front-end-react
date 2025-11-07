import React from 'react';
import Tag from './Tag';

/**
 * CampaignDetailHeader 컴포넌트가 받을 props 타입을 정의합니다.
 * @param imageUrl - 상단 이미지 URL (선택)
 * @param brandName - 브랜드명
 * @param deadlineDay - 마감 D-DAY (선택, 예: "D-3")
 * @param title - 공고 제목
 * @param content - 공고 내용 요약
 * @param onImageClick - 이미지 클릭 시 실행될 함수 (선택)
 */
interface CampaignDetailHeaderProps {
  imageUrl?: string;
  brandName: string;
  deadlineDay?: string;
  title: string;
  content: string;
  onImageClick?: () => void;
}

/**
 * 모집 공고 상세 페이지의 상단 헤더 컴포넌트입니다.
 * 이미지, 브랜드명, D-DAY 태그, 제목, 내용을 표시합니다.
 */
const CampaignDetailHeader: React.FC<CampaignDetailHeaderProps> = ({
  imageUrl,
  brandName,
  deadlineDay,
  title,
  content,
  onImageClick,
}) => {
  /**
   * 이미지 컨테이너 스타일
   * 가로로 긴 직사각형 형태입니다.
   */
  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '16 / 9', // 가로로 긴 비율
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
   * 이미지 스타일
   */
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  /**
   * 플레이스홀더 아이콘 스타일
   */
  const placeholderStyle: React.CSSProperties = {
    width: '64px',
    height: '64px',
    color: 'var(--dark-gray)',
    opacity: 0.5,
  };

  /**
   * 정보 영역 컨테이너 스타일
   */
  const infoContainerStyle: React.CSSProperties = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  /**
   * 브랜드명과 태그를 감싸는 컨테이너 스타일
   */
  const brandTagContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  };

  /**
   * 브랜드명 스타일
   */
  const brandNameStyle: React.CSSProperties = {
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    color: 'var(--dark-gray)',
    flex: 1,
  };

  /**
   * 제목 스타일
   */
  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--h1)', // 20px
    fontWeight: 700,
    color: 'var(--black)',
    lineHeight: 1.4,
  };

  /**
   * 내용 스타일
   */
  const contentStyle: React.CSSProperties = {
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    color: 'var(--dark-gray)',
    lineHeight: 1.5,
  };

  return (
    <div>
      {/* 이미지 영역 */}
      <div style={imageContainerStyle} onClick={onImageClick}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} style={imageStyle} />
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

      {/* 정보 영역 */}
      <div style={infoContainerStyle}>
        {/* 브랜드명과 D-DAY 태그 */}
        <div style={brandTagContainerStyle}>
          <span style={brandNameStyle}>{brandName}</span>
          {deadlineDay && (
            <Tag label={`마감 ${deadlineDay}`} variant="rounded" />
          )}
        </div>

        {/* 제목 */}
        <h1 style={titleStyle}>{title}</h1>

        {/* 내용 */}
        <p style={contentStyle}>{content}</p>
      </div>
    </div>
  );
};

export default CampaignDetailHeader;

