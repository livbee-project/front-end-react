import React from 'react';

/**
 * DetailContent 컴포넌트가 받을 props 타입을 정의합니다.
 * @param children - 컨텐츠 내부에 렌더링될 텍스트 또는 노드
 */
interface DetailContentProps {
  children: React.ReactNode;
}

/**
 * 상세 페이지의 텍스트 컨텐츠 영역 컴포넌트입니다.
 * 일관된 텍스트 스타일을 제공합니다.
 */
const DetailContent: React.FC<DetailContentProps> = ({ children }) => {
  /**
   * 컨텐츠 영역 스타일
   */
  const contentStyle: React.CSSProperties = {
    padding: '16px',
    minHeight: '100px',
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    color: 'var(--dark-gray)',
    lineHeight: 1.6,
  };

  return <div style={contentStyle}>{children}</div>;
};

export default DetailContent;

