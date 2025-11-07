import React from 'react';

/**
 * InputWrapper 컴포넌트가 받을 props 타입을 정의합니다.
 * @param children - 래퍼 내부에 렌더링될 컨텐츠
 */
interface InputWrapperProps {
  children: React.ReactNode;
}

/**
 * 입력 필드를 감싸는 공통 래퍼 컴포넌트입니다.
 * 아이콘 위치 지정을 위한 relative positioning을 제공합니다.
 */
const InputWrapper: React.FC<InputWrapperProps> = ({ children }) => {
  /**
   * 래퍼 스타일
   */
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  return <div style={wrapperStyle}>{children}</div>;
};

export default InputWrapper;

