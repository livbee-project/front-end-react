import React from 'react';

/**
 * FormRow 컴포넌트가 받을 props 타입을 정의합니다.
 * @param children - 행 내부에 렌더링될 컨텐츠
 */
interface FormRowProps {
  children: React.ReactNode;
}

/**
 * 등록 페이지의 폼 행 컴포넌트입니다.
 * 가로로 배치되는 입력 필드들을 위한 일관된 스타일을 제공합니다.
 */
const FormRow: React.FC<FormRowProps> = ({ children }) => {
  /**
   * 행 스타일
   */
  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  };

  return <div style={rowStyle}>{children}</div>;
};

export default FormRow;

