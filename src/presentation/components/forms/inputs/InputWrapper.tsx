import React from 'react';
import styled from 'styled-components';

interface InputWrapperProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const InputWrapper: React.FC<InputWrapperProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default InputWrapper;

