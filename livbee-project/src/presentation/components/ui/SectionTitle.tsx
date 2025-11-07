import React from 'react';

/**
 * SectionTitle 컴포넌트가 받을 props 타입을 정의합니다.
 * @param children - 제목 텍스트
 * @param variant - 제목 스타일 변형 ('default' | 'subtitle' | 'detail')
 * @param showBullet - "■" 기호 표시 여부 (기본값: false)
 * @param marginBottom - 하단 마진 (기본값: '16px')
 */
interface SectionTitleProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtitle' | 'detail';
  showBullet?: boolean;
  marginBottom?: string;
}

/**
 * 공통 섹션 제목 컴포넌트입니다.
 * 다양한 스타일 변형을 지원합니다.
 */
const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  variant = 'default',
  showBullet = false,
  marginBottom = '16px',
}) => {
  /**
   * variant에 따른 스타일
   */
  const getVariantStyle = (): React.CSSProperties => {
    switch (variant) {
      case 'default':
        return {
          fontSize: 'var(--h2)', // 18px
          fontWeight: 700,
          color: 'var(--black)',
        };
      case 'subtitle':
        return {
          fontSize: 'var(--h3)', // 16px
          fontWeight: 500,
          color: 'var(--dark-gray)',
        };
      case 'detail':
        return {
          fontSize: 'var(--h2)', // 18px
          fontWeight: 700,
          color: 'var(--black)',
        };
      default:
        return {
          fontSize: 'var(--h2)',
          fontWeight: 700,
          color: 'var(--black)',
        };
    }
  };

  /**
   * 제목 스타일
   */
  const titleStyle: React.CSSProperties = {
    ...getVariantStyle(),
    marginBottom,
    marginTop: 0,
  };

  return (
    <h2 style={titleStyle}>
      {showBullet && '■ '}
      {children}
    </h2>
  );
};

export default SectionTitle;

