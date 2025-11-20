import React from 'react';
import styled, { css } from 'styled-components';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';

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
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: ${({ theme }) => theme.spacing.md};
  }
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
  transition: transform 0.2s, border-color 0.2s;

  ${({ $hasClick, theme }) =>
    $hasClick &&
    css`
      &:hover {
        transform: scale(1.02);
        border-color: ${theme.colors.primary};
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


  /**
   * 기본 플레이스홀더 개수 계산
   * 최소 9개(3x3)를 표시합니다.
   */
  const placeholderCount = Math.max(9, Math.ceil(images.length / (columns * columns)) * columns * columns);
  const displayItems = images.length > 0 
    ? images 
    : Array(placeholderCount).fill(null);

  return (
    <GridContainer $columns={columns}>
      {displayItems.map((imageUrl, index) => (
        <ImageItem
          key={index}
          $hasClick={!!onImageClick}
          onClick={() => onImageClick && onImageClick(index)}
        >
          {imageUrl ? (
            <Image src={imageUrl} alt={`갤러리 이미지 ${index + 1}`} />
          ) : (
            <PlaceholderImage size={40} />
          )}
        </ImageItem>
      ))}
    </GridContainer>
  );
};

export default GalleryGrid;

