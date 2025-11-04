import React, { useState, useEffect, useRef } from 'react';

// (추가) Flutter 원본의 목업 데이터를 참고한 임시 배너 데이터
// Flutter 원본은 로컬 이미지를 사용하지만, 
// React 프로젝트에는 이미지가 없으므로 텍스트와 배경색으로 대체합니다.
const MOCK_BANNERS = [
    { id: 1, text: '배너 1 (16:9)', color: '#687CF4' },
    { id: 2, text: '배너 2 (16:9)', color: '#5E5E5E' },
    { id: 3, text: '배너 3 (16:9)', color: '#f0a0a0' },
];

/**
 * 16:9 비율의 자동 스크롤 이미지 배너 섹션
 * Flutter의 BannerSliderSection 위젯에 해당합니다.
 */
const BannerSliderSection: React.FC = () => {
    // 현재 활성화된 배너의 인덱스를 저장 (Flutter의 _currentPage)
    const [currentPage, setCurrentPage] = useState(0);
    // 타이머 참조를 저장하기 위한 Ref (Flutter의 _timer)
    const timerRef = useRef<number | null>(null);

    // 컴포넌트가 마운트/업데이트될 때 타이머 로직을 설정합니다.
    useEffect(() => {
        // (수정) window.setInterval을 명시적으로 사용하여
        // Node.js가 아닌 브라우저의 함수임을 확실히 합니다.
        timerRef.current = window.setInterval(() => {
            setCurrentPage((prevPage) => (prevPage + 1) % MOCK_BANNERS.length);
        }, 5000);

        // 컴포넌트가 언마운트될 때 타이머를 정리합니다 (Flutter의 dispose)
        return () => {
            if (timerRef.current) {
                // (수정) window.clearInterval을 사용합니다.
                window.clearInterval(timerRef.current);
            }
        };
    }, []); // 마운트 시 한 번만 실행

    return (
        // Flutter의 AspectRatio(16/9)와 동일하게 16:9 비율을 적용
        <section style={{ width: '100%', aspectRatio: '16 / 9', position: 'relative', overflow: 'hidden', borderRadius: 10 }}>
            {/* 1. 배너 이미지들을 담는 컨테이너 */}
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: `${MOCK_BANNERS.length * 100}%`, // (배너 개수 * 100)% 너비
                    // currentPage에 따라 컨테이너를 왼쪽으로 이동시킴
                    transform: `translateX(-${(currentPage / MOCK_BANNERS.length) * 100}%)`,
                    transition: 'transform 0.35s ease-in', // Flutter 원본의 animateToPage 효과
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
                        {banner.text}
                    </div>
                ))}
            </div>

            {/* 2. 페이지 인디케이터 (점) */}
            {/* Flutter의 Positioned와 Row 위젯에 해당 */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 8,
                }}
            >
                {MOCK_BANNERS.map((_, index) => (
                    <div
                        key={index}
                        style={{
                            // Flutter 원본의 AnimatedContainer 로직
                            width: currentPage === index ? 24 : 8,
                            height: 8,
                            backgroundColor: currentPage === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            borderRadius: 12,
                            transition: 'width 0.15s ease-in-out',
                        }}
                        // (추가) 점을 클릭하면 해당 배너로 이동
                        onClick={() => setCurrentPage(index)}
                    />
                ))}
            </div>
        </section>
    );
};

export default BannerSliderSection;