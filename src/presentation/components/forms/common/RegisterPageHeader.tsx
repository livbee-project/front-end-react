import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styled from 'styled-components';

interface RegisterPageHeaderProps {
  title: string;
}

const HeaderContainer = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid #F3F4F6;
  margin: 0 -20px 24px -20px;
  width: calc(100% + 40px);

  @media (min-width: 768px) {
    margin: 0 -20px 24px -20px;
    width: calc(100% + 40px);
  }
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: #111111;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #F3F4F6;
  }
`;

const HeaderTitle = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #111111;
  margin: 0;
`;

const HeaderSpacer = styled.div`
  width: 40px;
`;

export const RegisterPageHeader: React.FC<RegisterPageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <BackButton onClick={() => navigate(-1)} aria-label="뒤로가기">
        <ArrowLeft size={20} />
      </BackButton>
      <HeaderTitle>{title}</HeaderTitle>
      <HeaderSpacer />
    </HeaderContainer>
  );
};

