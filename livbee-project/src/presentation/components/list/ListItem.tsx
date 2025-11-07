import React from 'react';

/**
 * ListItem이 받을 props 타입을 정의합니다.
 * @param children - 아이템 내부에 렌더링될 React 노드
 * @param onTap - 아이템 클릭 시 실행될 함수 (선택)
 * @param style - 부모로부터 커스텀 CSS 스타일을 받기 위한 prop
 */
interface ListItemProps {
  children: React.ReactNode;
  onTap?: () => void;
  style?: React.CSSProperties;
}

/**
 * 클릭 가능하고, 상하 패딩이 적용된 리스트의 개별 아이템입니다.
 * (구. DividedListItem)
 */
const ListItem: React.FC<ListItemProps> = ({ children, onTap, style }) => {
  const itemStyle: React.CSSProperties = {
    padding: '12px 0', // 기본 상하 패딩
    cursor: onTap ? 'pointer' : 'default',
    ...style, // 부모로부터 받은 style을 덮어씀 (예: borderBottom: 'none')
  };

  return (
    <div onClick={onTap} style={itemStyle}>
      {children}
    </div>
  );
};

export default ListItem;