import React from 'react';

/**
 * DetailPageLayout 컴포넌트가 받을 props 타입을 정의합니다.
 * @param children - 페이지 내부에 렌더링될 컨텐츠
 */
interface DetailPageLayoutProps {
  children: React.ReactNode;
}

/**
 * 상세 페이지의 공통 레이아웃 래퍼 컴포넌트입니다.
 * 모든 상세 페이지에 공통으로 적용되는 스타일을 제공합니다.
 */
const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({ children }) => {
  /**
   * 페이지 컨테이너 스타일
   */
  const pageStyle: React.CSSProperties = {
    width: '100%',
    backgroundColor: 'var(--white)',
  };

  return <div style={pageStyle}>{children}</div>;
};

export default DetailPageLayout;

