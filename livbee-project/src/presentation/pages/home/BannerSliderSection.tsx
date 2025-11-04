import React, { useState, useEffect, useRef } from 'react';

const MOCK_BANNERS = [
    { id: 1, text: '배너 1 (16:9)', color: '#687CF4' },
    { id: 2, text: '배너 2 (16:9)', color: '#5E5E5E' },
    { id: 3, text: '배너 3 (16:9)', color: '#f0a0a0' },
];

/**
 * 16:9 비율의 자동 스크롤 + 터치 스와이프 배너 섹션
 */
const BannerSliderSection: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const timerRef = useRef<number | null>(null);

    // --- (추가) 터치 스와이프를 위한 state ---
    /** 터치 드래그 중인지 여부 */
    const [isDragging, setIsDragging] = useState(false);
    /** 터치 시작점의 X좌표 */
    const [touchStartX, setTouchStartX] = useState(0);
    /** 터치로 인해 발생한 X축 이동 거리 (px) */
    const [dragOffset, setDragOffset] = useState(0);
    // ---

    /** (추가) 다음 페이지로 이동하는 함수 */
    const goToNextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % MOCK_BANNERS.length);
    };

    /** (추가) 이전 페이지로 이동하는 함수 */
    const goToPrevPage = () => {
        setCurrentPage((prevPage) =>
            prevPage === 0 ? MOCK_BANNERS.length - 1 : prevPage - 1,
        );
    };

    /** (추가) 자동 슬라이드 타이머를 설정(초기화)하는 함수 */
    const startTimer = () => {
        // 기존 타이머가 있다면 초기화
        if (timerRef.current) {
            window.clearInterval(timerRef.current);
        }
        // 5초마다 다음 페이지로 이동
        timerRef.current = window.setInterval(() => {
            goToNextPage();
        }, 5000);
    };

    // 컴포넌트 마운트 시 타이머 시작 및 정리 로직
    useEffect(() => {
        startTimer(); // 타이머 시작
        // 컴포넌트 언마운트 시 타이머 정리
        return () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
            }
        };
    }, []); // 마운트 시 한 번만 실행

    // --- (추가) 터치 이벤트 핸들러 ---

    /** 터치 시작 시: 드래그 상태로 변경, 타이머 중지, 시작점 기록 */
    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true); // 드래그 시작
        setTouchStartX(e.touches[0].clientX); // 터치 시작 X좌표 기록
        if (timerRef.current) {
            window.clearInterval(timerRef.current); // 자동 슬라이드 타이머 중지
        }
    };

    /** 터치 후 드래그 시: 손가락을 따라 배너가 움직이도록 offset 계산 */
    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentTouchX = e.touches[0].clientX;
        const offset = currentTouchX - touchStartX; // 시작점과의 차이
        setDragOffset(offset); // 이동 거리(offset)를 state에 반영
    };

    /** 터치 종료 시: 스와이프 방향 판단, 페이지 변경, 타이머 재시작 */
    const handleTouchEnd = () => {
        setIsDragging(false); // 드래그 종료

        // 스와이프 임계값 (예: 50px)
        const swipeThreshold = 50;

        if (dragOffset < -swipeThreshold) {
            // 왼쪽으로 50px 이상 스와이프: 다음 페이지
            goToNextPage();
        } else if (dragOffset > swipeThreshold) {
            // 오른쪽으로 50px 이상 스와이프: 이전 페이지
            goToPrevPage();
        }
        // (임계값 미만이면 제자리로 돌아감)

        setDragOffset(0); // 드래그 이동 거리 초기화
        setTouchStartX(0); // 시작점 초기화
        startTimer(); // 자동 슬라이드 타이머 재시작
    };
    // ---

    // --- (수정) 배너 컨테이너 스타일 ---
    // 기본 translate % 값 (페이지 기준)
    const baseTranslatePercent = -(currentPage / MOCK_BANNERS.length) * 100;
    // 최종 transform 값 (페이지 기준 % + 드래그 픽셀)
    const containerTransform = `translateX(calc(${baseTranslatePercent}% + ${dragOffset}px))`;
    // 드래그 중일 때는 transition 효과를 제거하여 부드럽게 따라오도록 함
    const containerTransition = isDragging
        ? 'none'
        : 'transform 0.35s ease-in';
    // ---

    return (
        <section
            style={{
                width: '100%',
                aspectRatio: '16 / 9',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 10,
            }}
            // (추가) 터치 이벤트 핸들러를 최상위 <section>에 바인딩
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* 1. 배너 이미지들을 담는 컨테이너 (수정) */}
            <div
                style={{
                    display: 'flex',
                    height: '100%',
                    width: `${MOCK_BANNERS.length * 100}%`,
                    // (수정) transform과 transition을 동적 state로 제어
                    transform: containerTransform,
                    transition: containerTransition,
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
                            width: currentPage === index ? 24 : 8,
                            height: 8,
                            backgroundColor:
                                currentPage === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                            borderRadius: 12,
                            transition: 'width 0.15s ease-in-out',
                        }}
                        onClick={() => {
                            setCurrentPage(index); // 인디케이터 클릭 시
                            startTimer(); // 타이머 리셋
                        }}
                    />
                ))}
            </div>
        </section>
    );
};

export default BannerSliderSection;