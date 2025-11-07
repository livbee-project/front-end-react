import React from 'react';

/**
 * BulletList 컴포넌트가 받을 props 타입을 정의합니다.
 * @param items - 불릿 리스트에 표시할 항목들의 배열
 * @param bullet - 불릿 문자 (기본값: "•")
 */
interface BulletListProps {
  items: string[];
  bullet?: string;
}

/**
 * 불릿 리스트를 표시하는 컴포넌트입니다.
 * 브랜드 소개, 담당 업무, 자격요건, 우대사항 등에 사용됩니다.
 */
const BulletList: React.FC<BulletListProps> = ({ items, bullet = '•' }) => {
  /**
   * 리스트 컨테이너 스타일
   */
  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0',
    margin: '0',
  };

  /**
   * 리스트 아이템 스타일
   */
  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    color: 'var(--black)',
    lineHeight: 1.6,
  };

  /**
   * 불릿 스타일
   */
  const bulletStyle: React.CSSProperties = {
    flexShrink: 0,
    marginTop: '2px',
  };

  /**
   * 텍스트 스타일
   */
  const textStyle: React.CSSProperties = {
    flex: 1,
  };

  return (
    <ul style={listStyle}>
      {items.map((item, index) => (
        <li key={index} style={itemStyle}>
          <span style={bulletStyle}>{bullet}</span>
          <span style={textStyle}>{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default BulletList;

