import React from 'react';
import styled, { css } from 'styled-components';

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

const GridContainer = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ImageItem = styled.div<{ $hasClick: boolean }>`
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
  position: relative;
  overflow: hidden;
  transition: opacity 0.2s;

  ${({ $hasClick }) =>
    $hasClick &&
    css`
      &:hover {
        opacity: 0.9;
      }
    `}
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

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
  // 최대 6개 이미지로 제한
  const displayImages = images.slice(0, 6);

  if (displayImages.length === 0) {
    return null;
  }

  return (
    <GridContainer $columns={columns}>
      {displayImages.map((imageUrl, index) => (
        <ImageItem
          key={index}
          $hasClick={!!onImageClick}
          onClick={() => onImageClick && onImageClick(index)}
        >
          <Image src={imageUrl} alt={`갤러리 이미지 ${index + 1}`} />
        </ImageItem>
      ))}
    </GridContainer>
  );
};

export default GalleryGrid;

