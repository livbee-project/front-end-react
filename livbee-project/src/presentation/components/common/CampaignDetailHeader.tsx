import React from 'react';
import Tag from './Tag';
import PlaceholderImage from './PlaceholderImage';

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
          <PlaceholderImage size={64} />
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

