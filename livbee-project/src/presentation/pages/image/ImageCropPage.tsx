import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { P } from '@/presentation/components/styled/Typography';
import { theme } from '@/presentation/styles/theme';

/**
 * 전역 타입 확장
 */
declare global {
  interface Window {
    __imageCropCallbacks?: {
      [key: string]: (file: File) => void;
    };
  }
}

/**
 * 크롭 비율 타입
 */
type CropRatio = 'original' | '1:1' | '1:2' | '2:3' | '4:3';

/**
 * 크롭 비율 옵션
 */
const CROP_RATIOS: { value: CropRatio; label: string }[] = [
  { value: 'original', label: '원본' },
  { value: '1:1', label: '1:1' },
  { value: '1:2', label: '1:2' },
  { value: '2:3', label: '2:3' },
  { value: '4:3', label: '4:3' },
];

/**
 * 크롭 영역 정보
 */
interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * 이미지 크롭 페이지 컴포넌트
 */
const ImageCropPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // location.state에서 이미지 URL과 콜백 키 받기
  const imageUrl = (location.state as { imageUrl?: string })?.imageUrl;
  const imageFileName = (location.state as { imageFileName?: string })?.imageFileName || 'cropped-image.jpg';
  const callbackKey = (location.state as { callbackKey?: string })?.callbackKey;
  const returnPath = (location.state as { returnPath?: string })?.returnPath || '/';

  const [selectedRatio, setSelectedRatio] = useState<CropRatio>('original');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [cropArea, setCropArea] = useState<CropArea>({ x: 0, y: 0, width: 0, height: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 이미지 URL이 없으면 이전 페이지로 이동
  useEffect(() => {
    if (!imageUrl) {
      navigate(returnPath);
    } else {
      setImageSrc(imageUrl);
    }

    // cleanup: Blob URL 해제
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl, navigate, returnPath]);

  /**
   * 비율 값을 숫자로 변환
   */
  const getRatioValue = (ratio: CropRatio, imgWidth: number, imgHeight: number): number => {
    if (ratio === 'original') {
      return imgWidth > 0 && imgHeight > 0 ? imgWidth / imgHeight : 1;
    }
    const [w, h] = ratio.split(':').map(Number);
    return w / h;
  };

  /**
   * 이미지 크기 및 크롭 영역 업데이트 함수
   */
  const updateImageSizeAndCropArea = useCallback(() => {
    if (!imageSrc || !imageRef.current || !containerRef.current) return;
    
    const img = imageRef.current;
    const container = containerRef.current;

    if (!img.complete) return;

    // 실제 렌더링된 이미지 크기 확인 (getBoundingClientRect 사용)
    // 이 값이 실제 이미지가 표시되는 크기입니다 (검은 여백 제외)
    const imgRect = img.getBoundingClientRect();
    const actualDisplayWidth = imgRect.width;
    const actualDisplayHeight = imgRect.height;

    // 이미지가 아직 렌더링되지 않았으면 계산
    if (actualDisplayWidth === 0 || actualDisplayHeight === 0) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const containerAspect = containerWidth / containerHeight;

      let displayWidth: number;
      let displayHeight: number;

      if (imgAspect > containerAspect) {
        displayHeight = containerHeight;
        displayWidth = displayHeight * imgAspect;
      } else {
        displayWidth = containerWidth;
        displayHeight = displayWidth / imgAspect;
      }

      setImageSize({ width: displayWidth, height: displayHeight });
      return; // 다음 프레임에서 다시 시도
    }

    // 실제 렌더링된 이미지 크기를 사용 (검은 여백 제외)
    setImageSize({ width: actualDisplayWidth, height: actualDisplayHeight });

    const imgAspect = img.naturalWidth / img.naturalHeight;
    
    // 초기 크롭 영역 설정 (최대 크기, 중앙에 위치)
    const ratio = selectedRatio === 'original' 
      ? imgAspect 
      : getRatioValue(selectedRatio, actualDisplayWidth, actualDisplayHeight);
    
    // 최대 크기: 실제 표시된 이미지의 너비 또는 높이 중 하나가 먼저 같아질 때까지
    let maxCropWidth: number;
    let maxCropHeight: number;
    
    if (ratio > actualDisplayWidth / actualDisplayHeight) {
      // 크롭 비율이 이미지보다 더 넓음 - 너비를 기준
      maxCropWidth = actualDisplayWidth;
      maxCropHeight = maxCropWidth / ratio;
    } else {
      // 크롭 비율이 이미지보다 더 높음 - 높이를 기준
      maxCropHeight = actualDisplayHeight;
      maxCropWidth = maxCropHeight * ratio;
    }
    
    // 실제 크롭 영역 크기 결정
    const cropWidth = maxCropWidth;
    const cropHeight = maxCropHeight;
    
    // 정확히 중앙에 위치하도록 계산 (실제 표시된 이미지 기준, 검은 여백 제외)
    const x = (actualDisplayWidth - cropWidth) / 2;
    const y = (actualDisplayHeight - cropHeight) / 2;

    setCropArea({
      x: Math.max(0, x),
      y: Math.max(0, y),
      width: cropWidth,
      height: cropHeight,
    });
  }, [imageSrc, selectedRatio]);

  // 이미지 로드 후 초기 크롭 영역 설정
  useEffect(() => {
    if (imageSrc && imageRef.current) {
      const img = imageRef.current;
      
      const updateAfterLoad = () => {
        // 이미지가 완전히 렌더링된 후 약간의 지연을 두고 업데이트
        // requestAnimationFrame을 사용하여 레이아웃이 완료된 후 실행
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            updateImageSizeAndCropArea();
          });
        });
      };
      
      if (img.complete) {
        updateAfterLoad();
      } else {
        img.onload = updateAfterLoad;
      }
    }
  }, [imageSrc, selectedRatio, updateImageSizeAndCropArea]);

  // 윈도우 리사이즈 이벤트 처리 (반응형)
  useEffect(() => {
    const handleResize = () => {
      updateImageSizeAndCropArea();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateImageSizeAndCropArea]);

  // 비율 변경 시 크롭 영역 업데이트 (중심점 유지)
  useEffect(() => {
    if (imageSize.width === 0 || imageSize.height === 0) return;
    if (!imageRef.current) return;

    const img = imageRef.current;
    const imgAspect = img.naturalWidth / img.naturalHeight;
    const ratio = selectedRatio === 'original' 
      ? imgAspect 
      : getRatioValue(selectedRatio, imageSize.width, imageSize.height);
    
    // 최대 크기: 이미지의 너비 또는 높이 중 하나가 먼저 같아질 때까지
    let maxCropWidth: number;
    let maxCropHeight: number;
    
    if (ratio > imageSize.width / imageSize.height) {
      // 크롭 비율이 이미지보다 더 넓음 - 너비를 기준
      maxCropWidth = imageSize.width;
      maxCropHeight = maxCropWidth / ratio;
    } else {
      // 크롭 비율이 이미지보다 더 높음 - 높이를 기준
      maxCropHeight = imageSize.height;
      maxCropWidth = maxCropHeight * ratio;
    }
    
    const newWidth = maxCropWidth;
    const newHeight = maxCropHeight;

    // 크롭 영역이 이미지 범위를 벗어나지 않도록 조정
    const maxX = imageSize.width - newWidth;
    const maxY = imageSize.height - newHeight;

    setCropArea((prev) => {
      // 현재 크롭 영역의 중심점 유지
      const centerX = prev.x + prev.width / 2;
      const centerY = prev.y + prev.height / 2;
      
      const newX = Math.max(0, Math.min(centerX - newWidth / 2, maxX));
      const newY = Math.max(0, Math.min(centerY - newHeight / 2, maxY));

      return {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      };
    });
  }, [selectedRatio, imageSize]);

  /**
   * 크롭 영역 모서리/가장자리 감지 (리사이즈 영역)
   */
  const getResizeHandle = (x: number, y: number): string | null => {
    const handleSize = 20; // 핸들 감지 영역 크기
    const { x: cx, y: cy, width, height } = cropArea;
    
    // 모서리 체크
    if (Math.abs(x - cx) < handleSize && Math.abs(y - cy) < handleSize) return 'nw';
    if (Math.abs(x - (cx + width)) < handleSize && Math.abs(y - cy) < handleSize) return 'ne';
    if (Math.abs(x - cx) < handleSize && Math.abs(y - (cy + height)) < handleSize) return 'sw';
    if (Math.abs(x - (cx + width)) < handleSize && Math.abs(y - (cy + height)) < handleSize) return 'se';
    
    // 가장자리 체크
    if (Math.abs(x - cx) < handleSize && y >= cy && y <= cy + height) return 'w';
    if (Math.abs(x - (cx + width)) < handleSize && y >= cy && y <= cy + height) return 'e';
    if (Math.abs(y - cy) < handleSize && x >= cx && x <= cx + width) return 'n';
    if (Math.abs(y - (cy + height)) < handleSize && x >= cx && x <= cx + width) return 's';
    
    return null;
  };

  /**
   * 마우스/터치 드래그 시작
   */
  const handleDragStart = (clientX: number, clientY: number) => {
    if (!containerRef.current || !imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    
    // 이미지 기준 좌표 계산
    const x = clientX - imageRect.left;
    const y = clientY - imageRect.top;

    // 리사이즈 핸들 체크
    const resizeHandle = getResizeHandle(x, y);
    if (resizeHandle) {
      setIsResizing(true);
      setResizeStart({ x, y, width: cropArea.width, height: cropArea.height });
      return;
    }

    // 크롭 영역 내부인지 확인 (드래그 이동)
    if (
      x >= cropArea.x &&
      x <= cropArea.x + cropArea.width &&
      y >= cropArea.y &&
      y <= cropArea.y + cropArea.height
    ) {
      setIsDragging(true);
      setDragStart({ x: x - cropArea.x, y: y - cropArea.y });
    }
  };

  /**
   * 마우스/터치 드래그 중
   */
  const handleDragMove = (clientX: number, clientY: number) => {
    if (!containerRef.current || !imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    const currentX = clientX - imageRect.left;
    const currentY = clientY - imageRect.top;

    // 리사이즈 중
    if (isResizing) {
      const ratio = selectedRatio === 'original' 
        ? imageSize.width / imageSize.height 
        : getRatioValue(selectedRatio, imageSize.width, imageSize.height);
      
      // 중심점 고정
      const centerX = cropArea.x + cropArea.width / 2;
      const centerY = cropArea.y + cropArea.height / 2;
      
      // 현재 마우스 위치에서 중심점까지의 거리 계산
      const deltaX = currentX - centerX;
      const deltaY = currentY - centerY;
      
      // 비율에 맞는 크기 계산 (대각선 거리 사용)
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const baseDistance = Math.sqrt(
        (resizeStart.width / 2) * (resizeStart.width / 2) + 
        (resizeStart.height / 2) * (resizeStart.height / 2)
      );
      
      // 스케일 계산
      const scale = distance / baseDistance;
      
      // 새로운 크기 계산 (비율 유지)
      let newWidth = resizeStart.width * scale;
      let newHeight = newWidth / ratio;
      
      // 최소/최대 크기 제한
      const minSize = 100;
      
      // 최대 크기: 이미지의 너비 또는 높이 중 하나가 먼저 같아질 때까지
      let maxWidth: number;
      let maxHeight: number;
      
      if (ratio > imageSize.width / imageSize.height) {
        // 크롭 비율이 이미지보다 더 넓음 - 너비를 기준
        maxWidth = imageSize.width;
        maxHeight = maxWidth / ratio;
      } else {
        // 크롭 비율이 이미지보다 더 높음 - 높이를 기준
        maxHeight = imageSize.height;
        maxWidth = maxHeight * ratio;
      }
      
      newWidth = Math.max(minSize, Math.min(newWidth, maxWidth));
      newHeight = Math.max(minSize, Math.min(newHeight, maxHeight));
      
      // 비율 재조정
      if (newWidth / newHeight !== ratio) {
        newHeight = newWidth / ratio;
      }
      
      // 새로운 위치 계산 (중심점 유지)
      const newX = centerX - newWidth / 2;
      const newY = centerY - newHeight / 2;
      
      // 이미지 범위 내에서만 조절
      const maxX = imageSize.width - newWidth;
      const maxY = imageSize.height - newHeight;
      
      setCropArea({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
        width: newWidth,
        height: newHeight,
      });
      return;
    }

    // 드래그 이동 중
    if (isDragging) {
      const x = currentX - dragStart.x;
      const y = currentY - dragStart.y;

      // 이미지 범위 내에서만 이동
      const maxX = imageSize.width - cropArea.width;
      const maxY = imageSize.height - cropArea.height;

      setCropArea((prev) => ({
        ...prev,
        x: Math.max(0, Math.min(x, maxX)),
        y: Math.max(0, Math.min(y, maxY)),
      }));
    }
  };

  /**
   * 마우스/터치 드래그 종료
   */
  const handleDragEnd = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  /**
   * 크롭된 이미지를 Blob으로 변환
   */
  const cropImage = (): Promise<File> => {
    return new Promise((resolve, reject) => {
      if (!imageRef.current || !canvasRef.current) {
        reject(new Error('이미지 또는 캔버스를 찾을 수 없습니다.'));
        return;
      }

      const img = imageRef.current;
      const canvas = canvasRef.current;

      // 실제 이미지 크기 대비 표시 크기 비율 계산
      const scaleX = img.naturalWidth / imageSize.width;
      const scaleY = img.naturalHeight / imageSize.height;

      // 크롭 영역을 실제 이미지 크기로 변환
      const cropX = cropArea.x * scaleX;
      const cropY = cropArea.y * scaleY;
      const cropWidth = cropArea.width * scaleX;
      const cropHeight = cropArea.height * scaleY;

      // 캔버스 크기 설정
      canvas.width = cropWidth;
      canvas.height = cropHeight;

      // 이미지 크롭하여 캔버스에 그리기
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('캔버스 컨텍스트를 가져올 수 없습니다.'));
        return;
      }

      ctx.drawImage(
        img,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      // 캔버스를 Blob으로 변환
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('이미지 변환에 실패했습니다.'));
            return;
          }
          const file = new File([blob], imageFileName, {
            type: 'image/jpeg',
          });
          resolve(file);
        },
        'image/jpeg',
        0.95
      );
    });
  };

  /**
   * 저장 버튼 클릭 핸들러
   */
  const handleSave = async () => {
    try {
      const croppedFile = await cropImage();
      
      // 전역 콜백 호출
      if (callbackKey && window.__imageCropCallbacks?.[callbackKey]) {
        const callback = window.__imageCropCallbacks[callbackKey];
        
        // 콜백이 비동기 함수일 수 있으므로 await 처리
        try {
          const result: unknown = callback(croppedFile);
          // Promise인 경우 완료될 때까지 대기
          if (result != null && typeof result === 'object' && 'then' in result && typeof (result as any).then === 'function') {
            await (result as Promise<any>);
          }
        } catch (callbackError) {
          console.error('이미지 업로드 콜백 실패:', callbackError);
          // 콜백 실패해도 페이지는 이동 (사용자가 다시 시도할 수 있도록)
        }
        
        // 콜백 호출 후 정리
        delete window.__imageCropCallbacks[callbackKey];
      }
      
      navigate(returnPath);
    } catch (error) {
      console.error('이미지 크롭 실패:', error);
      alert('이미지 크롭에 실패했습니다.');
    }
  };

  /**
   * 뒤로가기 핸들러
   */
  const handleBack = () => {
    navigate(returnPath);
  };

  if (!imageSrc) {
    return (
      <LoadingContainer>
        <P>이미지를 불러오는 중...</P>
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      {/* 상단 바 */}
      <TopBar>
        <HeaderButton onClick={handleBack}>
          {'<< 뒤로가기'}
        </HeaderButton>
        <HeaderButton onClick={handleSave}>
          저장
        </HeaderButton>
      </TopBar>

      {/* 이미지 크롭 영역 */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: '#000',
        }}
        onMouseDown={(e) => handleDragStart(e.clientX, e.clientY)}
        onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchEnd={handleDragEnd}
      >
        <div
          style={{
            position: 'relative',
            width: imageSize.width > 0 ? `${imageSize.width}px` : 'auto',
            height: imageSize.height > 0 ? `${imageSize.height}px` : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 'auto', // 중앙 정렬
          }}
        >
          <img
            ref={imageRef}
            src={imageSrc}
            alt="크롭할 이미지"
            style={{
              width: imageSize.width > 0 ? `${imageSize.width}px` : 'auto',
              height: imageSize.height > 0 ? `${imageSize.height}px` : 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              userSelect: 'none',
              pointerEvents: 'none',
              display: 'block',
              objectFit: 'contain', // 비율 유지
            }}
          />

          {/* 크롭 영역 오버레이 */}
          {imageSize.width > 0 && imageSize.height > 0 && (
            <>
              <div
                style={{
                  position: 'absolute',
                  left: `${cropArea.x}px`,
                  top: `${cropArea.y}px`,
                  width: `${cropArea.width}px`,
                  height: `${cropArea.height}px`,
                  border: '2px solid #fff',
                  boxSizing: 'border-box',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  zIndex: 10,
                }}
              >
                {/* 그리드 */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(3, 1fr)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* 어두운 오버레이 (크롭 영역 외부) */}
              {imageSize.width > 0 && imageSize.height > 0 && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${imageSize.width}px`,
                    height: `${imageSize.height}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    clipPath: `polygon(
                      0% 0%,
                      0% 100%,
                      ${(cropArea.x / imageSize.width) * 100}% 100%,
                      ${(cropArea.x / imageSize.width) * 100}% ${(cropArea.y / imageSize.height) * 100}%,
                      ${((cropArea.x + cropArea.width) / imageSize.width) * 100}% ${(cropArea.y / imageSize.height) * 100}%,
                      ${((cropArea.x + cropArea.width) / imageSize.width) * 100}% ${((cropArea.y + cropArea.height) / imageSize.height) * 100}%,
                      ${(cropArea.x / imageSize.width) * 100}% ${((cropArea.y + cropArea.height) / imageSize.height) * 100}%,
                      ${(cropArea.x / imageSize.width) * 100}% 100%,
                      100% 100%,
                      100% 0%
                    )`,
                    pointerEvents: 'none',
                  }}
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* 하단 바 - 크롭 비율 선택 */}
      <BottomBar>
        {CROP_RATIOS.map((ratio) => (
          <RatioButton
            key={ratio.value}
            onClick={() => setSelectedRatio(ratio.value)}
            $isActive={selectedRatio === ratio.value}
          >
            {ratio.label}
          </RatioButton>
        ))}
      </BottomBar>

      {/* 숨겨진 캔버스 (크롭 처리용) */}
      <HiddenCanvas ref={canvasRef} />
    </PageContainer>
  );
};

const LoadingContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #000;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: #1a1a1a;
  color: ${theme.colors.primaryForeground};
`;

const HeaderButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.h2};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: #1a1a1a;
  overflow-x: auto;
`;

const RatioButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background-color: ${({ $isActive }) => ($isActive ? theme.colors.primaryForeground : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? '#000' : theme.colors.primaryForeground)};
  font: ${({ theme }) => theme.fonts.body};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s;
`;

const HiddenCanvas = styled.canvas`
  display: none;
`;

export default ImageCropPage;

