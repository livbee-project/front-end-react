/**
 * 크롭 페이지로 이동하기 전에 현재 스크롤 위치를 저장하는 유틸리티 함수
 * 크롭 페이지에서 돌아올 때 스크롤 위치를 복원하기 위해 사용됩니다.
 */
export const saveScrollPositionBeforeCrop = (currentPath: string): void => {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  const mainContent = document.querySelector('main');
  const mainContentScrollTop = mainContent?.scrollTop || 0;
  
  sessionStorage.setItem('scrollPosition', JSON.stringify({
    scrollY: scrollPosition,
    mainContentScrollTop: mainContentScrollTop,
    path: currentPath,
  }));
};

