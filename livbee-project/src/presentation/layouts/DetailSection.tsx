import React from 'react';
import SectionTitle from '@/presentation/components/ui/SectionTitle';

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
   * 제목에서 "■" 기호 추출
   */
  const hasBullet = title ? title.startsWith('■') : false;
  const titleText = title && hasBullet ? title.substring(2).trim() : title;

  return (
    <div style={sectionStyle}>
      {title && (
        <SectionTitle variant="detail" showBullet={hasBullet}>
          {titleText}
        </SectionTitle>
      )}
      {children}
    </div>
  );
};

export default DetailSection;

