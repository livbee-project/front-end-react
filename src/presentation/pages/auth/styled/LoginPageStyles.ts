import styled from 'styled-components';

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing['5xl']} ${theme.spacing.lg}`};
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing['3xl']};
`;

