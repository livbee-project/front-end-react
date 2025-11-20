import React from 'react';

interface InputWrapperProps {
  children: React.ReactNode;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ children }) => {
  const wrapperStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  return <div style={wrapperStyle}>{children}</div>;
};

export default InputWrapper;

