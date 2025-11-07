import React from 'react';
import { RiAddLine } from 'react-icons/ri';

/**
 * FloatingActionButton가 받을 props 타입을 정의합니다.
 * @param onClick - 버튼 클릭 시 실행될 함수
 */
interface FloatingActionButtonProps {
  onClick?: () => void;
}

/**
 * 오른쪽 하단에 고정되는 플로팅 액션 버튼 컴포넌트
 * 컨텐츠 영역의 최대 너비를 기준으로 위치가 조정됩니다.
 */
const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
}) => {
  const buttonStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '80px', // 하단 네비게이션 바 위에 위치
    // 화면 최대 너비 1200px 기준으로 위치 계산
    // 1200px 이하: 화면 오른쪽 끝에서 16px
    // 1200px 초과: 1200px 컨텐츠 영역의 오른쪽 끝에서 16px
    right: 'max(16px, calc((100vw - 1200px) / 2 + 16px))',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    border: 'none',
    cursor: onClick ? 'pointer' : 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    zIndex: 1000,
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleMouseDown = () => {
    // 클릭 시 약간의 시각적 피드백
    if (onClick) {
      const button = document.getElementById('fab-button');
      if (button) {
        button.style.transform = 'scale(0.95)';
      }
    }
  };

  const handleMouseUp = () => {
    const button = document.getElementById('fab-button');
    if (button) {
      button.style.transform = 'scale(1)';
    }
  };

  return (
    <button
      id="fab-button"
      style={buttonStyle}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      aria-label="추가"
    >
      <RiAddLine size={24} />
    </button>
  );
};

export default FloatingActionButton;

