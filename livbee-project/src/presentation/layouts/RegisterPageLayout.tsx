import React from 'react';

/**
 * RegisterPageLayout 컴포넌트가 받을 props 타입을 정의합니다.
 * @param children - 페이지 내부에 렌더링될 컨텐츠
 */
interface RegisterPageLayoutProps {
  children: React.ReactNode;
}

/**
 * 등록 페이지의 공통 레이아웃 컴포넌트입니다.
 * 일관된 패딩과 스타일을 제공합니다.
 */
const RegisterPageLayout: React.FC<RegisterPageLayoutProps> = ({ children }) => {
  /**
   * 페이지 컨테이너 스타일
   */
  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: '#F9FAFB',
    padding: '0 20px 20px 20px',
  };

  return <div style={pageStyle}>{children}</div>;
};

export default RegisterPageLayout;

