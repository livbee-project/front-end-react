import { useState, useEffect } from 'react';
import type { RefObject } from 'react';

interface UseLoginBubblePositionProps {
  showhostButtonRef: RefObject<HTMLButtonElement | null>;
  tabContainerRef: RefObject<HTMLDivElement | null>;
  userType: 'brand' | 'showhost';
}

/**
 * 로그인 페이지 말풍선 위치를 계산하는 훅
 */
export const useLoginBubblePosition = ({
  showhostButtonRef,
  tabContainerRef,
  userType,
}: UseLoginBubblePositionProps): string => {
  const [bubbleLeft, setBubbleLeft] = useState<string>('75%');

  useEffect(() => {
    const updateBubblePosition = () => {
      if (showhostButtonRef.current && tabContainerRef.current) {
        const buttonRect = showhostButtonRef.current.getBoundingClientRect();
        const containerRect = tabContainerRef.current.getBoundingClientRect();

        // 쇼호스트 버튼의 중앙 X 좌표
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        // 탭 컨테이너의 왼쪽 X 좌표
        const containerLeftX = containerRect.left;
        // 탭 컨테이너 기준 상대 위치 (픽셀)
        const relativeX = buttonCenterX - containerLeftX;
        // 탭 컨테이너 너비 기준 퍼센트
        const percentX = (relativeX / containerRect.width) * 100;

        setBubbleLeft(`${percentX}%`);
      }
    };

    // 초기 위치 계산 (약간의 지연을 두어 DOM이 완전히 렌더링된 후 계산)
    const timer = setTimeout(updateBubblePosition, 0);

    // 윈도우 리사이즈 시 위치 재계산
    window.addEventListener('resize', updateBubblePosition);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateBubblePosition);
    };
  }, [showhostButtonRef, tabContainerRef, userType]);

  return bubbleLeft;
};

