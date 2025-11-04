import React from 'react';
// (추가) 방금 생성한 useSlider 훅 임포트
import { useSlider } from '../../hooks/useSlider';

const MOCK_BANNERS = [
    { id: 1, text: '배너 1 (16:9)', color: '#687CF4' },
    { id: 2, text: '배너 2 (16:9)', color: '#5E5E5E' },
    { id: 3, text: '배너 3 (16:9)', color: '#f0a0a0' },
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
        <section
            style={{
                width: '100%',
                aspectRatio: '16 / 9',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 10,
                cursor: 'grab', // 드래그 가능 커서
            }}
            // (수정) 훅에서 반환된 이벤트 핸들러 묶음을 적용
            {...containerProps}
        >
            {/* 1. 배너 컨테이너 */}
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: `${MOCK_BANNERS.length * 100}%`,
                    // (수정) 훅에서 계산된 스타일 적용
                    transform: transform,
                    transition: transition,
                    userSelect: 'none', // 드래그 시 텍스트 선택 방지
                }}
            >
                {MOCK_BANNERS.map((banner) => (
                    <div
                        key={banner.id}
                        style={{
                            width: `${100 / MOCK_BANNERS.length}%`,
                            height: '100%',
                            backgroundColor: banner.color,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        <span style={{ userSelect: 'none' }}>{banner.text}</span>
                    </div>
                ))}
            </div>

            {/* 2. 페이지 인디케이터 (점) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 8,
                    pointerEvents: 'none', // 이벤트가 배너 섹션으로 전달되도록
                }}
            >
                {MOCK_BANNERS.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            // (수정) 훅의 currentPage 사용
                            width: currentPage === index ? 24 : 8,
                            height: 8,
                            backgroundColor:
                                currentPage === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            borderRadius: 12,
                            transition: 'width 0.15s ease-in-out',
                            pointerEvents: 'auto', // 인디케이터는 클릭 가능하도록
                        }}
                        onClick={(e) => {
                            e.stopPropagation(); // 이벤트 버블링 방지
                            // (수정) 훅에서 제공하는 goToPage 함수 사용
                            goToPage(index);
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default BannerSliderSection;