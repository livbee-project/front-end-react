import React from 'react';
import styled from 'styled-components';

interface ComposerBarProps {
  value: string;
  error: string | null;
  loading: boolean;
  disabled: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

const ComposerBar: React.FC<ComposerBarProps> = ({
  value,
  error,
  loading,
  disabled,
  onChange,
  onSend,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <ComposerBarContainer>
      <ComposerInner>
        <InputField
          placeholder="메시지를 입력하세요"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading || disabled}
        />
        <SendButton
          type="button"
          aria-label="메시지 전송"
          onClick={onSend}
          disabled={loading || disabled || !value.trim()}
        >
          ➤
        </SendButton>
      </ComposerInner>
      {error && <SendError>{error}</SendError>}
    </ComposerBarContainer>
  );
};

const ComposerBarContainer = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: 72px;
  z-index: 60;
  width: 100%;
  max-width: 960px;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  box-sizing: border-box;
  box-shadow: 0 -6px 16px rgba(0, 0, 0, 0.04);

  @media (max-width: 768px) {
    left: 0;
    right: 0;
    transform: none;
    max-width: none;
    padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
    bottom: calc(64px + env(safe-area-inset-bottom));
  }
`;

const ComposerInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InputField = styled.input`
  flex: 1;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => `${theme.spacing.md} 18px`};
  font-size: 16px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const SendButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font-size: 1rem;
  box-shadow: 0 10px 22px ${({ theme }) => theme.primaryOpacity['35']};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

const SendError = styled.p`
  margin-top: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.error};
  font: ${({ theme }) => theme.fonts.caption};
`;

export default ComposerBar;

