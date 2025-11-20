import React from 'react';
import styled from 'styled-components';
import { useSlider } from '@/presentation/hooks/useSlider';
import banner01 from '@/presentation/assets/images/banner_01.jpg';
import banner02 from '@/presentation/assets/images/banner_02.jpg';

// (수정) 텍스트/색상에서 실제 임포트한 이미지 경로(src)로 변경합니다.
const MOCK_BANNERS = [
    { id: 1, src: banner01 },
    { id: 2, src: banner02 },
];

/**
 * 16:9 비율의 자동 스크롤 + 터치/마우스 스와이프 배너 섹션
 * (수정) 모든 로직을 useSlider 훅으로 분리
 */
const BannerSliderSection: React.FC = () => {
    // --- (수정) 모든 상태, 참조, 핸들러 로직을 훅 호출로 대체 ---
    const {
        currentPage, // 현재 페이지 인덱스
        transform,     // 계산된 transform CSS
        transition,    // 계산된 transition CSS
        containerProps, // onMouseDown, onTouchStart 등 모든 이벤트 핸들러
        goToPage,      // 인디케이터 클릭용 함수
    } = useSlider({
        itemCount: MOCK_BANNERS.length,
        autoPlay: true,
        interval: 5000,
    });
    // ---

    return (
        <SliderSection {...containerProps}>
            <BannerContainer $transform={transform} $transition={transition} $itemCount={MOCK_BANNERS.length}>
                {MOCK_BANNERS.map((banner) => (
                    <BannerImage key={banner.id} src={banner.src} alt={`배너 ${banner.id}`} $itemCount={MOCK_BANNERS.length} />
                ))}
            </BannerContainer>

            <IndicatorContainer>
                {MOCK_BANNERS.map((_, index) => (
                    <Indicator
                        key={index}
                        $isActive={currentPage === index}
                        onClick={(e) => {
                            e.stopPropagation();
                            goToPage(index);
                        }}
                    />
                ))}
            </IndicatorContainer>
        </SliderSection>
    );
};

const SliderSection = styled.section`
  width: 100%;
  aspect-ratio: 16 / 9;
  position: relative;
  overflow: hidden;
  cursor: grab;
`;

const BannerContainer = styled.div<{ $transform: string; $transition: string; $itemCount: number }>`
  display: flex;
  height: 100%;
  width: ${({ $itemCount }) => $itemCount * 100}%;
  transform: ${({ $transform }) => $transform};
  transition: ${({ $transition }) => $transition};
  user-select: none;
`;

const BannerImage = styled.img<{ $itemCount: number }>`
  width: ${({ $itemCount }) => `calc(100% / ${$itemCount})`};
  height: 100%;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  pointer-events: none;
`;

const Indicator = styled.button<{ $isActive: boolean }>`
  width: ${({ $isActive }) => ($isActive ? '24px' : '8px')};
  height: 8px;
  background-color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primaryForeground : 'rgba(255, 255, 255, 0.5)'};
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  transition: width 0.15s ease-in-out;
  pointer-events: auto;
  cursor: pointer;
`;

export default BannerSliderSection;