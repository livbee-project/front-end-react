import React from 'react';

/**
 * DividedListItem이 받을 props 타입을 정의합니다.
 * @param children - 아이템 내부에 렌더링될 React 노드
 * @param onTap - 아이템 클릭 시 실행될 함수 (선택)
 * @param style - (추가) 부모로부터 커스텀 CSS 스타일을 받기 위한 prop
 */
interface DividedListItemProps {
  children: React.ReactNode;
  onTap?: () => void;
  style?: React.CSSProperties; // <-- (수정) style prop 추가
}

/**
 * 클릭 가능하고, 상하 패딩이 적용된 리스트의 개별 아이템입니다.
 * Flutter의 DividedListItem 위젯에 해당합니다.
 */
const DividedListItem: React.FC<DividedListItemProps> = ({
  children,
  onTap,
  style, // <-- (수정) style prop 받기
}) => {
  // (수정) 기본 스타일과 전달받은 style prop을 병합합니다.
  const itemStyle: React.CSSProperties = {
    // Flutter 원본의 padding
    padding: '12px 0',
    cursor: onTap ? 'pointer' : 'default',
    ...style, // <-- (수정) 전달받은 style을 여기에 적용 (e.g., borderBottom: 'none')
  };

  return (
    <div
      onClick={onTap}
      style={itemStyle} // <-- (수정) 병합된 스타일 적용
    >
      {children}
    </div>
  );
};

export default DividedListItem;