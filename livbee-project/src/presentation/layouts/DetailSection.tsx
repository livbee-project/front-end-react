import React from 'react';

/**
 * DetailSection 컴포넌트가 받을 props 타입을 정의합니다.
 * @param title - 섹션 제목 (선택)
 * @param showDivider - 하단 구분선 표시 여부 (기본값: true)
 * @param children - 섹션 내부에 렌더링될 컨텐츠
 */
interface DetailSectionProps {
  title?: string;
  showDivider?: boolean;
  children: React.ReactNode;
}

/**
 * 상세 페이지의 섹션 컨테이너 컴포넌트입니다.
 * 제목과 구분선을 포함한 일관된 섹션 스타일을 제공합니다.
 */
const DetailSection: React.FC<DetailSectionProps> = ({
  title,
  showDivider = true,
  children,
}) => {
  /**
   * 섹션 컨테이너 스타일
   */
  const sectionStyle: React.CSSProperties = {
    padding: '16px',
    borderBottom: showDivider ? '1px solid #F7F8FA' : 'none',
  };

  /**
   * 섹션 제목 스타일
   */
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 'var(--h2)', // 18px
    fontWeight: 700,
    color: 'var(--black)',
    marginBottom: '16px',
  };

  return (
    <div style={sectionStyle}>
      {title && <h2 style={sectionTitleStyle}>{title}</h2>}
      {children}
    </div>
  );
};

export default DetailSection;

