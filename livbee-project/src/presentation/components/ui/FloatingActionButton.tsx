import React from 'react';
import styled from 'styled-components';
import { Plus as PlusIcon } from 'lucide-react';

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
    <Button
      id="fab-button"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      aria-label="추가"
      $hasClick={!!onClick}
    >
      <PlusIcon size={24} />
    </Button>
  );
};

const Button = styled.button<{ $hasClick: boolean }>`
  position: fixed;
  bottom: 80px;
  right: max(16px, calc((100vw - 1200px) / 2 + 16px));
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  border: none;
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: transform 0.2s, box-shadow 0.2s;
`;

export default FloatingActionButton;

