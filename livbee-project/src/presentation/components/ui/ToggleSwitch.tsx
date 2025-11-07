import React from 'react';

/**
 * ToggleSwitch가 받을 props 타입을 정의합니다.
 */
interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

/**
 * 토글 스위치 컴포넌트
 */
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  const toggleStyle: React.CSSProperties = {
    position: 'relative',
    width: '48px',
    height: '28px',
    borderRadius: '14px',
    backgroundColor: checked ? 'var(--primary)' : '#E5E7ED',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    flexShrink: 0,
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '2px',
    left: checked ? '22px' : '2px',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: 'var(--white)',
    transition: 'left 0.2s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  };

  return (
    <div
      style={toggleStyle}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <div style={thumbStyle} />
    </div>
  );
};

export default ToggleSwitch;

