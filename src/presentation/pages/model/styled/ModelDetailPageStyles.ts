import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.secondary};
  padding-bottom: 80px;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin: 32px 16px 0;
`;

