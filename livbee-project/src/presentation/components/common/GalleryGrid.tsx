import React from 'react';

/**
 * GalleryGrid 컴포넌트가 받을 props 타입을 정의합니다.
 * @param images - 이미지 URL 배열
 * @param columns - 그리드 열 개수 (기본값: 3)
 * @param onImageClick - 이미지 클릭 시 실행될 함수 (선택, 인덱스 전달)
 */
interface GalleryGridProps {
  images?: string[];
  columns?: number;
  onImageClick?: (index: number) => void;
}

/**
 * 모델 상세 페이지의 갤러리 섹션에서 사용되는
 * 이미지 그리드 컴포넌트입니다.
 * 3x3 그리드 레이아웃을 기본으로 지원합니다.
 */
const GalleryGrid: React.FC<GalleryGridProps> = ({
  images = [],
  columns = 3,
  onImageClick,
}) => {
  /**
   * 그리드 컨테이너 스타일
   * CSS Grid를 사용하여 동적으로 열 개수를 조정합니다.
   */
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '1px',
    backgroundColor: '#F7F8FA', // 구분선 색상
    border: '1px solid #F7F8FA',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  /**
   * 개별 이미지 아이템 스타일
   */
  const imageItemStyle: React.CSSProperties = {
    aspectRatio: '1 / 1', // 정사각형 비율
    backgroundColor: '#F7F8FA',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: onImageClick ? 'pointer' : 'default',
    position: 'relative',
    overflow: 'hidden',
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
    width: '40px',
    height: '40px',
    color: 'var(--dark-gray)',
    opacity: 0.5,
  };

  /**
   * 기본 플레이스홀더 개수 계산
   * 최소 9개(3x3)를 표시합니다.
   */
  const placeholderCount = Math.max(9, Math.ceil(images.length / (columns * columns)) * columns * columns);
  const displayItems = images.length > 0 
    ? images 
    : Array(placeholderCount).fill(null);

  return (
    <div style={gridStyle}>
      {displayItems.map((imageUrl, index) => (
        <div
          key={index}
          style={imageItemStyle}
          onClick={() => onImageClick && onImageClick(index)}
        >
          {imageUrl ? (
            <img src={imageUrl} alt={`갤러리 이미지 ${index + 1}`} style={imageStyle} />
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
      ))}
    </div>
  );
};

export default GalleryGrid;

