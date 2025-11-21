import React from 'react';
import styled from 'styled-components';
import type { FormRowProps } from '@/types/forms';

const FormRow: React.FC<FormRowProps> = ({ children }) => {
  return <RowContainer>{children}</RowContainer>;
};

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export default FormRow;

