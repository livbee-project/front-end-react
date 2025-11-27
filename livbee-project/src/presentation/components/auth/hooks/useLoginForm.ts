import { useState, useCallback } from 'react';
import type { UserType } from '@/types/auth';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { validateLoginForm, loginMessages } from '../utils/loginValidation';

interface UseLoginFormOptions {
  defaultUserType?: UserType;
  onSuccess?: () => void;
}

interface UseLoginFormReturn {
  userType: UserType;
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
  setUserType: (type: UserType) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleLogin: () => Promise<void>;
  handleSignUpClick: () => void;
}

export const useLoginForm = ({
  defaultUserType = 'brand',
  onSuccess,
}: UseLoginFormOptions = {}): UseLoginFormReturn => {
  const { login } = useAuth();
  const { showToast } = useToast();

  const [userType, setUserType] = useState<UserType>(defaultUserType);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = useCallback(async () => {
    const validationError = validateLoginForm({ email, password });
    if (validationError) {
      setError(validationError);
      showToast(validationError, undefined, 'error');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login({
        email: email.trim(),
        password,
        role: userType,
      });

      showToast('로그인되었습니다.');
      onSuccess?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : loginMessages.GENERIC_ERROR;
      setError(errorMessage);
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, userType, login, showToast, onSuccess]);

  const handleSignUpClick = useCallback(() => {
    showToast('회원가입은 아직 준비 중입니다.', undefined, 'info');
  }, [showToast]);

  return {
    userType,
    email,
    password,
    isLoading,
    error,
    setUserType,
    setEmail,
    setPassword,
    handleLogin,
    handleSignUpClick,
  };
};

