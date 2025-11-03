import React from 'react';

/**
 * DividedListItem이 받을 props 타입을 정의합니다.
 * @param children - 아이템 내부에 렌더링될 React 노드 (예: 텍스트, 이미지)
 * @param onTap - 아이템 클릭 시 실행될 함수 (선택)
 */
interface DividedListItemProps {
  children: React.ReactNode;
  onTap?: () => void;
}

/**
 * 클릭 가능하고, 상하 패딩이 적용된 리스트의 개별 아이템입니다.
 * Flutter의 DividedListItem 위젯에 해당합니다.
 */
const DividedListItem: React.FC<DividedListItemProps> = ({
  children,
  onTap,
}) => {
  return (
    <div
      onClick={onTap}
      style={{
        // Flutter 원본의 padding: EdgeInsets.symmetric(vertical: 12.0)
        padding: '12px 0',
        // onTap 함수가 있으면 클릭 가능하도록 커서 변경
        cursor: onTap ? 'pointer' : 'default',
      }}
    >
      {children}
    </div>
  );
};

export default DividedListItem;