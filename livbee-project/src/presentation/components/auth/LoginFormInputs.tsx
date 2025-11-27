import React from 'react';
import InputWrapper from '@/presentation/components/forms/inputs/InputWrapper';
import { StyledInput } from './styled/LoginFormStyles';

interface LoginFormInputsProps {
  email: string;
  password: string;
  isLoading: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onEnterPress: () => void;
}

export const LoginFormInputs: React.FC<LoginFormInputsProps> = ({
  email,
  password,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onEnterPress,
}) => {
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !isLoading) {
      onEnterPress();
    }
  };

  return (
    <>
      <InputWrapper>
        <StyledInput
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => onEmailChange(event.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
      </InputWrapper>

      <InputWrapper>
        <StyledInput
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(event) => onPasswordChange(event.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
      </InputWrapper>
    </>
  );
};

