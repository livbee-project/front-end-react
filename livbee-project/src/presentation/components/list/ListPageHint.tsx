import React from 'react';

/**
 * ListPageHint 컴포넌트가 받을 props 타입을 정의합니다.
 * @param text - 안내 문구 텍스트 (기본값: '카드를 누르면 상세 정보를 보실 수 있습니다.')
 */
interface ListPageHintProps {
  text?: string;
}

/**
 * 리스트 페이지의 안내 문구 컴포넌트입니다.
 * 일관된 스타일과 위치를 제공합니다.
 */
const ListPageHint: React.FC<ListPageHintProps> = ({
  text = '카드를 누르면 상세 정보를 보실 수 있습니다.',
}) => {
  /**
   * 안내 문구 스타일
   */
  const hintStyle: React.CSSProperties = {
    marginBlockStart: '40px',
    marginBlockEnd: 0,
    fontSize: '12px',
    color: 'var(--dark-gray)',
    marginBottom: '20px',
  };

  return <p style={hintStyle}>{text}</p>;
};

export default ListPageHint;

