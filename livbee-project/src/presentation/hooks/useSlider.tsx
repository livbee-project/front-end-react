import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * useSlider 훅에 전달할 옵션
 * @param itemCount - 전체 슬라이드 아이템 개수
 * @param autoPlay - 자동 재생 여부 (기본값: false)
 * @param interval - 자동 재생 간격 (기본값: 5000ms)
 */
interface UseSliderProps {
    itemCount: number;
    autoPlay?: boolean;
    interval?: number;
}

/**
 * 터치/마우스 스와이프 및 자동 재생 로직을 처리하는 공통 커스텀 훅
 */
export const useSlider = ({
    itemCount,
    autoPlay = false,
    interval = 5000,
}: UseSliderProps) => {
    // --- 상태 및 참조 ---
    const [currentPage, setCurrentPage] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const timerRef = useRef<number | null>(null);

    // --- 페이지 이동 로직 ---
    // useCallback: 함수를 메모리제이션하여 불필요한 재생성을 방지
    const goToPage = useCallback(
        (page: number) => {
            // 페이지 인덱스가 0보다 작거나 마지막 페이지보다 크지 않도록 보정
            const newPage = Math.max(0, Math.min(page, itemCount - 1));
            setCurrentPage(newPage);
        },
        [itemCount],
    );

    const goToNextPage = useCallback(() => {
        setCurrentPage((prev) => (prev + 1) % itemCount);
    }, [itemCount]);

    const goToPrevPage = useCallback(() => {
        setCurrentPage((prev) => (prev === 0 ? itemCount - 1 : prev - 1));
    }, [itemCount]);

    // --- 타이머 로직 ---
    const startTimer = useCallback(() => {
        // autoPlay가 false면 타이머를 시작하지 않음
        if (!autoPlay) return;
        // 기존 타이머가 있으면 중지
        if (timerRef.current) window.clearInterval(timerRef.current);
        // 새 타이머 시작
        timerRef.current = window.setInterval(goToNextPage, interval);
    }, [autoPlay, interval, goToNextPage]);

    // 컴포넌트 마운트 시/startTimer 함수 변경 시 타이머 시작
    useEffect(() => {
        startTimer();
        // 언마운트 시 타이머 정리
        return () => {
            if (timerRef.current) window.clearInterval(timerRef.current);
        };
    }, [startTimer]);

    // --- 드래그 이벤트 공통 로직 ---
    // 드래그 시작 (터치/마우스 공통)
    const handleDragStart = useCallback((clientX: number) => {
        setIsDragging(true);
        setTouchStartX(clientX);
        // 드래그 시작 시 타이머 중지
        if (timerRef.current) window.clearInterval(timerRef.current);
    }, []);

    // 드래그 중 (터치/마우스 공통)
    const handleDragMove = useCallback(
        (clientX: number) => {
            if (!isDragging) return;
            setDragOffset(clientX - touchStartX);
        },
        [isDragging, touchStartX],
    );

    // 드래그 종료 (터치/마우스 공통)
    const handleDragEnd = useCallback(() => {
        if (!isDragging) return; // 이미 종료됐으면 무시
        setIsDragging(false);

        const swipeThreshold = 50; // 스와이프 임계값
        if (dragOffset < -swipeThreshold) goToNextPage();
        else if (dragOffset > swipeThreshold) goToPrevPage();

        setDragOffset(0); // 이동 거리 리셋
        startTimer(); // 타이머 재시작
    }, [isDragging, dragOffset, goToNextPage, goToPrevPage, startTimer]);

    // --- 이벤트 핸들러 매핑 ---
    const containerProps = {
        // 마우스 이벤트
        onMouseDown: (e: React.MouseEvent) => handleDragStart(e.clientX),
        onMouseMove: (e: React.MouseEvent) => handleDragMove(e.clientX),
        onMouseUp: handleDragEnd,
        onMouseLeave: handleDragEnd,
        // 터치 이벤트
        onTouchStart: (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX),
        onTouchMove: (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX),
        onTouchEnd: handleDragEnd,
    };

    // --- 스타일 계산 ---
    const baseTranslatePercent = -(currentPage / itemCount) * 100;
    const transform = `translateX(calc(${baseTranslatePercent}% + ${dragOffset}px))`;
    const transition = isDragging ? 'none' : 'transform 0.35s ease-in';

    // --- 훅 반환 값 ---
    // 컴포넌트에서 필요한 상태와 이벤트 핸들러만 반환
    return {
        currentPage,
        transform,
        transition,
        containerProps, // 이벤트 핸들러 묶음
        // 인디케이터 클릭 시 타이머도 리셋하는 함수
        goToPage: (index: number) => {
            goToPage(index);
            startTimer();
        },
    };
};