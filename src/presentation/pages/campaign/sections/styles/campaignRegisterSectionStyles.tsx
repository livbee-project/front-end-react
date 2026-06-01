import styled from 'styled-components';
import { Textarea } from '@/presentation/components/styled/CommonStyles';

export const StyledTextarea = styled(Textarea)`
  width: 100%;
`;

export const FeeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

export const FeeInputWrapper = styled.div`
  flex: 1;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  white-space: nowrap;
`;

export const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primary};
`;

export const CheckboxLabel = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  user-select: none;
`;

