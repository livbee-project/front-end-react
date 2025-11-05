import React from 'react';

/**
 * BottomNavItem이 받을 props 타입을 정의합니다.
 * @param label - 탭에 표시될 텍스트
 * @param icon - 탭에 표시될 아이콘 (임시 텍스트)
 * @param isActive - 이 탭이 현재 활성화되었는지 여부
 * @param onClick - 탭 버튼 클릭 시 실행될 함수
 */
interface BottomNavItemProps {
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

/**
 * BottomNavBar의 개별 탭 아이템 UI 컴포넌트
 * (BottomNavBar.tsx의 map 루프 내부 로직을 분리)
 */
const BottomNavItem: React.FC<BottomNavItemProps> = ({
  label,
  icon: Icon, // (수정) prop 이름을 소문자 'icon'에서 대문자 'Icon'으로 변경 (컴포넌트로 사용하기 위함)
  isActive,
  onClick,
}) => {
  // --- 스타일 정의 (BottomNavBar.tsx에서 이동) ---

  /** 개별 탭 버튼 스타일 */
  const tabButtonStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
    gap: 8,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  };

  /** 아이콘과 텍스트의 공통 스타일 (변경 없음) */
  const textAndIconStyle: React.CSSProperties = {
    color: isActive ? 'var(--primary)' : 'var(--dark-gray)',
    transition: 'color 0.1s ease',
  };

  return (
    <button style={tabButtonStyle} onClick={onClick}>
      {/*
        (수정) 1. 아이콘
        <span>{icon}</span> 대신,
        prop으로 전달받은 <Icon> 컴포넌트를 렌더링합니다.
      */}
      <Icon
        size={20} // Flutter 원본과 동일한 20px
        style={textAndIconStyle} // 활성/비활성 색상 적용
      />

      {/* 2. 라벨 (변경 없음) */}
      <span
        style={{
          ...textAndIconStyle,
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {label}
      </span>
    </button>
  );
};

export default BottomNavItem;
