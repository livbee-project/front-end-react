import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole } from '@/domain/entities/User';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { validateSignupForm, buildSignupRequest } from '@/presentation/components/auth/utils/signupValidation';

interface UseSignupFormOptions {
  defaultUserType?: UserRole;
  onSuccess?: () => void;
}

interface UseSignupFormReturn {
  userType: UserRole;
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  brandName: string;
  companyName: string;
  businessNumber: string;
  nickname: string;
  snsLink: string;
  introduction: string;
  isLoading: boolean;
  setUserType: (type: UserRole) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  setPhone: (value: string) => void;
  setBrandName: (value: string) => void;
  setCompanyName: (value: string) => void;
  setBusinessNumber: (value: string) => void;
  setNickname: (value: string) => void;
  setSnsLink: (value: string) => void;
  setIntroduction: (value: string) => void;
  handleSignup: () => Promise<void>;
}

export const useSignupForm = ({
  defaultUserType = 'brand',
  onSuccess,
}: UseSignupFormOptions = {}): UseSignupFormReturn => {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [userType, setUserType] = useState<UserRole>(defaultUserType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhone] = useState('');
  const [brandName, setBrandName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [snsLink, setSnsLink] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = useCallback(async () => {
    const formData = {
      name,
      email,
      password,
      passwordConfirm,
      phone,
      brandName,
      companyName,
      businessNumber,
      nickname,
      snsLink,
      introduction,
      role: userType,
    };

    const validationError = validateSignupForm(formData);
    if (validationError) {
      showToast(validationError, undefined, 'error');
      return;
    }

    setIsLoading(true);

    try {
      const request = buildSignupRequest(formData);
      await signup(request);

      showToast('회원가입이 완료되었습니다. 로그인해주세요.', undefined, 'success');
      navigate('/login', { replace: true });
      onSuccess?.();
    } catch (err) {
      console.error('회원가입 실패:', err);
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    email,
    password,
    passwordConfirm,
    phone,
    brandName,
    companyName,
    businessNumber,
    nickname,
    snsLink,
    introduction,
    userType,
    signup,
    showToast,
    navigate,
    onSuccess,
  ]);

  return {
    userType,
    name,
    email,
    password,
    passwordConfirm,
    phone,
    brandName,
    companyName,
    businessNumber,
    nickname,
    snsLink,
    introduction,
    isLoading,
    setUserType,
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setPhone,
    setBrandName,
    setCompanyName,
    setBusinessNumber,
    setNickname,
    setSnsLink,
    setIntroduction,
    handleSignup,
  };
};
