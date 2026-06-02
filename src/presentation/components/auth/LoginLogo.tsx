import React from 'react';
import styled from 'styled-components';
import liveelogo from '@/presentation/assets/images/liveelogo.png';

export const LoginLogo: React.FC = () => {
  return (
    <LogoContainer>
      <LogoImage src={liveelogo} alt="라이비 로고" />
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const LogoImage = styled.img`
  max-width: 450px;
  width: 100%;
  height: auto;
  object-fit: contain;
`;

