import React from 'react';

/**
 * Tag 컴포넌트가 받을 props 타입을 정의합니다.
 * @param label - 태그에 표시될 텍스트
 * @param variant - 태그 스타일 변형 ('rounded' | 'circle')
 * @param onClick - 태그 클릭 시 실행될 함수 (선택)
 */
interface TagProps {
  label: string;
  variant?: 'rounded' | 'circle';
  onClick?: () => void;
}

/**
 * 정보 및 태그 섹션에서 사용되는 태그 컴포넌트입니다.
 * 둥근 사각형 또는 원형 스타일을 지원합니다.
 */
const Tag: React.FC<TagProps> = ({ label, variant = 'rounded', onClick }) => {
  /**
   * 태그 컨테이너 스타일
   * variant에 따라 borderRadius가 달라집니다.
   */
  const tagStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    padding: variant === 'rounded' ? '6px 12px' : '0',
    borderRadius: variant === 'rounded' ? '16px' : '50%',
    width: variant === 'circle' ? '32px' : 'auto',
    height: variant === 'circle' ? '32px' : 'auto',
    cursor: onClick ? 'pointer' : 'default',
    flexShrink: 0,
  };

  return (
    <div style={tagStyle} onClick={onClick}>
      {label}
    </div>
  );
};

export default Tag;

