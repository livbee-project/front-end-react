import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SPACING } from '@/presentation/styles/constants';

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
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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

  // 이미지 로드 후 초기 크롭 영역 설정
  useEffect(() => {
    if (imageSrc && imageRef.current) {
      const img = imageRef.current;
      const updateImageSize = () => {
        const container = containerRef.current;
        if (!img || !container) return;

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

        // 초기 크롭 영역 설정
        const ratio = selectedRatio === 'original' 
          ? imgAspect 
          : getRatioValue(selectedRatio, displayWidth, displayHeight);
        const cropWidth = Math.min(displayWidth, containerWidth) * 0.8;
        const cropHeight = cropWidth / ratio;

        // 크롭 영역이 이미지 범위를 벗어나지 않도록 조정
        const maxX = displayWidth - cropWidth;
        const maxY = displayHeight - cropHeight;

        setCropArea({
          x: Math.max(0, Math.min(maxX / 2, maxX)),
          y: Math.max(0, Math.min(maxY / 2, maxY)),
          width: cropWidth,
          height: cropHeight,
        });
      };

      if (img.complete) {
        updateImageSize();
      } else {
        img.onload = updateImageSize;
      }
    }
  }, [imageSrc, selectedRatio]);

  // 비율 변경 시 크롭 영역 업데이트
  useEffect(() => {
    if (imageSize.width === 0 || imageSize.height === 0) return;

    const ratio = selectedRatio === 'original' 
      ? imageSize.width / imageSize.height 
      : getRatioValue(selectedRatio, imageSize.width, imageSize.height);
    
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const newWidth = Math.min(imageSize.width, containerWidth) * 0.8;
    const newHeight = newWidth / ratio;

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
   * 마우스/터치 드래그 시작
   */
  const handleDragStart = (clientX: number, clientY: number) => {
    if (!containerRef.current || !imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    
    // 이미지 기준 좌표 계산
    const x = clientX - imageRect.left;
    const y = clientY - imageRect.top;

    // 크롭 영역 내부인지 확인
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
    if (!isDragging || !containerRef.current || !imageRef.current) return;
    const imageRect = imageRef.current.getBoundingClientRect();
    const x = clientX - imageRect.left - dragStart.x;
    const y = clientY - imageRect.top - dragStart.y;

    // 이미지 범위 내에서만 이동
    const maxX = imageSize.width - cropArea.width;
    const maxY = imageSize.height - cropArea.height;

    setCropArea((prev) => ({
      ...prev,
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    }));
  };

  /**
   * 마우스/터치 드래그 종료
   */
  const handleDragEnd = () => {
    setIsDragging(false);
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
        callback(croppedFile);
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
      <div style={{ padding: SPACING.LG, textAlign: 'center' }}>
        이미지를 불러오는 중...
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000',
      }}
    >
      {/* 상단 바 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: `${SPACING.MD} ${SPACING.LG}`,
          backgroundColor: '#1a1a1a',
          color: '#fff',
        }}
      >
        <button
          onClick={handleBack}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 'var(--h3)',
            cursor: 'pointer',
            padding: SPACING.SM,
          }}
        >
          {'<< 뒤로가기'}
        </button>
        <button
          onClick={handleSave}
          style={{
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: 'var(--h3)',
            cursor: 'pointer',
            padding: SPACING.SM,
          }}
        >
          저장
        </button>
      </div>

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: SPACING.MD,
          padding: `${SPACING.MD} ${SPACING.LG}`,
          backgroundColor: '#1a1a1a',
          overflowX: 'auto',
        }}
      >
        {CROP_RATIOS.map((ratio) => (
          <button
            key={ratio.value}
            onClick={() => setSelectedRatio(ratio.value)}
            style={{
              padding: `${SPACING.SM} ${SPACING.MD}`,
              borderRadius: '20px',
              border: 'none',
              backgroundColor: selectedRatio === ratio.value ? '#fff' : 'transparent',
              color: selectedRatio === ratio.value ? '#000' : '#fff',
              fontSize: 'var(--p2)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {ratio.label}
          </button>
        ))}
      </div>

      {/* 숨겨진 캔버스 (크롭 처리용) */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ImageCropPage;

