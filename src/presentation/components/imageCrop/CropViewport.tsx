import React from 'react';
import styled from 'styled-components';
import type { CropArea, ImageSize } from '@/types/imageCrop';

interface CropViewportProps {
  imageSrc: string;
  imageSize: ImageSize;
  cropArea: CropArea;
  isDragging: boolean;
  imageRef: React.RefObject<HTMLImageElement>;
  containerRef: React.RefObject<HTMLDivElement>;
  onDragStart: (clientX: number, clientY: number) => void;
  onDragMove: (clientX: number, clientY: number) => void;
  onDragEnd: () => void;
}

export const CropViewport: React.FC<CropViewportProps> = ({
  imageSrc,
  imageSize,
  cropArea,
  isDragging,
  imageRef,
  containerRef,
  onDragStart,
  onDragMove,
  onDragEnd,
}) => {
  return (
    <Container
      ref={containerRef}
      onMouseDown={(e) => onDragStart(e.clientX, e.clientY)}
      onMouseMove={(e) => onDragMove(e.clientX, e.clientY)}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onTouchStart={(e) => {
        // 두 손가락 터치(핀치 줌) 차단
        if (e.touches.length > 1) {
          e.preventDefault();
          return;
        }
        onDragStart(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={(e) => {
        // 두 손가락 터치(핀치 줌) 차단
        if (e.touches.length > 1) {
          e.preventDefault();
          return;
        }
        onDragMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={onDragEnd}
      onTouchCancel={onDragEnd}
    >
      <ImageWrapper $width={imageSize.width} $height={imageSize.height}>
        <CropImage
          ref={imageRef}
          src={imageSrc}
          alt="크롭할 이미지"
          $width={imageSize.width}
          $height={imageSize.height}
        />

        {/* 크롭 영역 오버레이 */}
        {imageSize.width > 0 && imageSize.height > 0 && (
          <>
            <CropOverlay
              $x={cropArea.x}
              $y={cropArea.y}
              $width={cropArea.width}
              $height={cropArea.height}
              $isDragging={isDragging}
            >
              <GridContainer>
                {Array.from({ length: 9 }).map((_, i) => (
                  <GridLine key={i} />
                ))}
              </GridContainer>
            </CropOverlay>

            <DarkOverlay
              $imageSize={imageSize}
              $cropArea={cropArea}
            />
          </>
        )}
      </ImageWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: fixed; /* 고정 위치 */
  top: calc(60px + env(safe-area-inset-top)); /* 상단 헤더 높이 */
  bottom: calc(80px + 40px + env(safe-area-inset-bottom)); /* 하단 컨트롤 높이 */
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 스크롤 비활성화 */
  background-color: #000;
  box-sizing: border-box;
  width: 100%;
  touch-action: pan-x pan-y; /* 드래그만 허용, 핀치 줌 차단 */
  -webkit-touch-callout: none; /* iOS 롱프레스 메뉴 차단 */
  -webkit-user-select: none;
  user-select: none;
`;

const ImageWrapper = styled.div<{ $width: number; $height: number }>`
  position: relative;
  width: ${({ $width }) => ($width > 0 ? `${$width}px` : 'auto')};
  height: ${({ $height }) => ($height > 0 ? `${$height}px` : 'auto')};
  max-width: 100%;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const CropImage = styled.img<{ $width: number; $height: number }>`
  width: ${({ $width }) => ($width > 0 ? `${$width}px` : 'auto')};
  height: ${({ $height }) => ($height > 0 ? `${$height}px` : 'auto')};
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  pointer-events: none;
  display: block;
  object-fit: contain;
`;

const CropOverlay = styled.div<{
  $x: number;
  $y: number;
  $width: number;
  $height: number;
  $isDragging: boolean;
}>`
  position: absolute;
  left: ${({ $x }) => `${$x}px`};
  top: ${({ $y }) => `${$y}px`};
  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};
  border: 2px solid #fff;
  box-sizing: border-box;
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  z-index: 10;
`;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  position: relative;
`;

const GridLine = styled.div`
  /* 각 셀의 오른쪽과 아래쪽에만 border 적용하여 겹침 방지 */
  border-right: 1px solid rgba(255, 255, 255, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  
  /* 마지막 열과 행의 border 제거 */
  &:nth-child(3n) {
    border-right: none;
  }
  
  &:nth-child(n+7) {
    border-bottom: none;
  }
`;

const DarkOverlay = styled.div.attrs<{
  $imageSize: ImageSize;
  $cropArea: CropArea;
}>(({ $imageSize, $cropArea }) => ({
  style: {
    clipPath: `polygon(
      0% 0%,
      0% 100%,
      ${($cropArea.x / $imageSize.width) * 100}% 100%,
      ${($cropArea.x / $imageSize.width) * 100}% ${($cropArea.y / $imageSize.height) * 100}%,
      ${(($cropArea.x + $cropArea.width) / $imageSize.width) * 100}% ${($cropArea.y / $imageSize.height) * 100}%,
      ${(($cropArea.x + $cropArea.width) / $imageSize.width) * 100}% ${(($cropArea.y + $cropArea.height) / $imageSize.height) * 100}%,
      ${($cropArea.x / $imageSize.width) * 100}% ${(($cropArea.y + $cropArea.height) / $imageSize.height) * 100}%,
      ${($cropArea.x / $imageSize.width) * 100}% 100%,
      100% 100%,
      100% 0%
    )`,
  },
}))<{
  $imageSize: ImageSize;
  $cropArea: CropArea;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ $imageSize }) => `${$imageSize.width}px`};
  height: ${({ $imageSize }) => `${$imageSize.height}px`};
  background-color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
`;

