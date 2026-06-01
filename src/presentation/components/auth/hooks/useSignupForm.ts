import { useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import type { UserRole, KakaoUserInfo, BusinessVerificationResult } from '@/domain/entities/User';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import { validateSignupForm, buildSignupRequest } from '@/presentation/components/auth/utils/signupValidation';
import { UserRepository } from '@/data/repositories/UserRepository';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useTimer } from '@/presentation/hooks/useTimer';
import { useKakaoAuth } from '@/presentation/hooks/auth/useKakaoAuth';
import { removePhoneHyphens, getBusinessNumberDigits } from '@/shared/utils/formatUtils';
import { ApiError } from '@/shared/utils/apiClient';
import { error as logError } from '@/shared/utils/logger';

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
  /** 카카오로 진입해 가입하는 경우 (이메일 readOnly, 비밀번호 필드 비노출) */
  isFromKakao: boolean;
  kakaoId: string;
  brandName: string;
  companyName: string;
  businessNumber: string;
  nickname: string;
  snsLink: string;
  introduction: string;
  isLoading: boolean;
  isPhoneVerified: boolean;
  verificationCode: string;
  setVerificationCode: (value: string) => void;
  timer: { secondsLeft: number; isRunning: boolean; start: () => void; reset: () => void };
  /** 인증요청을 한 번이라도 했으면 true (재요청 문구·인증번호 필드 노출용) */
  hasRequestedCode: boolean;
  setUserType: (type: UserRole) => void;
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  setPasswordConfirm: (value: string) => void;
  setPhone: (value: string) => void;
  setKakaoId: (value: string) => void;
  setBrandName: (value: string) => void;
  setCompanyName: (value: string) => void;
  setBusinessNumber: (value: string) => void;
  setNickname: (value: string) => void;
  setSnsLink: (value: string) => void;
  setIntroduction: (value: string) => void;
  handleSignup: () => Promise<void>;
  handleSendSmsCode: () => Promise<void>;
  handleVerifyCode: () => Promise<void>;
  /** 사업자등록번호 진위 확인 (브랜드 회원가입용) */
  handleVerifyBusiness: () => Promise<void>;
  handleKakaoSuccess: (info: KakaoUserInfo) => void;
  kakaoAuth: { loginWithKakao: () => Promise<KakaoUserInfo>; isLoading: boolean };
  /** 사업자 진위 확인 요청 중 */
  isVerifyingBusiness: boolean;
  /** 진위 확인 결과 (유효 여부·상태 등) */
  businessVerificationResult: BusinessVerificationResult | null;
  /** 개업일자 (YYYYMMDD 또는 date input 값 YYYY-MM-DD) */
  openingDate: string;
  /** 대표자명 */
  representativeName: string;
  setOpeningDate: (value: string) => void;
  setRepresentativeName: (value: string) => void;
}

export const useSignupForm = ({
  defaultUserType = 'brand',
  onSuccess,
}: UseSignupFormOptions = {}): UseSignupFormReturn => {
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const userRepository = useRepository(UserRepository);
  const timer = useTimer(180);
  const { loginWithKakao, isLoading: isLoadingKakao } = useKakaoAuth();

  const [userType, setUserType] = useState<UserRole>(defaultUserType);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [phone, setPhoneState] = useState('');
  const [brandName, setBrandName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [businessNumber, setBusinessNumberState] = useState('');
  const [openingDate, setOpeningDate] = useState('');
  const [representativeName, setRepresentativeName] = useState('');
  const [businessVerificationResult, setBusinessVerificationResult] = useState<BusinessVerificationResult | null>(null);
  const [isVerifyingBusiness, setIsVerifyingBusiness] = useState(false);
  const [nickname, setNickname] = useState('');
  const [snsLink, setSnsLink] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [kakaoId, setKakaoId] = useState('');
  const [hasRequestedCode, setHasRequestedCode] = useState(false);
  const isVerifyingBusinessRef = useRef(false);

  const setBusinessNumber = useCallback((value: string) => {
    const digits = getBusinessNumberDigits(value);
    setBusinessNumberState(digits);
    setBusinessVerificationResult(null);
  }, []);

  const setPhone = useCallback(
    (value: string) => {
      setPhoneState(value);
      setIsPhoneVerified(false);
      setVerificationCode('');
      setHasRequestedCode(false);
      timer.reset();
    },
    [timer]
  );

  const handleSendSmsCode = useCallback(async () => {
    const digits = removePhoneHyphens(phone);
    if (digits.length < 10 || digits.length > 11) {
      showToast('휴대폰 번호를 10~11자리로 입력해 주세요.', undefined, 'error');
      return;
    }
    try {
      await userRepository.sendSms(digits);
      setHasRequestedCode(true);
      timer.start();
      showToast('인증번호가 발송되었습니다.', undefined, 'success');
    } catch {
      showToast('인증번호 발송에 실패했습니다.', undefined, 'error');
    }
  }, [phone, userRepository, timer, showToast]);

  const handleVerifyCode = useCallback(async () => {
    const digits = removePhoneHyphens(phone);
    try {
      await userRepository.verifySms(digits, verificationCode);
      setIsPhoneVerified(true);
      showToast('인증이 완료되었습니다.', undefined, 'success');
    } catch {
      showToast('인증번호가 일치하지 않습니다.', undefined, 'error');
    }
  }, [phone, verificationCode, userRepository, showToast]);

  const handleVerifyBusiness = useCallback(async () => {
    if (isVerifyingBusinessRef.current) {
      return;
    }

    const digits = getBusinessNumberDigits(businessNumber);
    if (digits.length !== 10) {
      showToast('사업자등록번호 10자리를 입력해 주세요.', undefined, 'error');
      return;
    }
    const openingDateForApi = openingDate.trim() ? openingDate.replace(/-/g, '') : undefined;
    const representativeNameTrimmed = representativeName.trim() || undefined;

    isVerifyingBusinessRef.current = true;
    setIsVerifyingBusiness(true);
    setBusinessVerificationResult(null);
    try {
      const result = await userRepository.verifyBusiness(
        digits,
        openingDateForApi,
        representativeNameTrimmed
      );
      setBusinessVerificationResult(result);
      if (result.valid) {
        showToast('사업자 등록정보를 확인했습니다.', undefined, 'success');
      } else {
        showToast(
          '국세청 기준으로 등록이 없거나, 폐업/휴업 상태일 수 있습니다.',
          undefined,
          'error'
        );
      }
    } catch (err: unknown) {
      // API 에러는 ApiErrorToastListener에서 공통 처리
      if (!(err instanceof ApiError)) {
        showToast(
          '사업자 등록정보를 확인하지 못했습니다. 잠시 후 다시 시도해 주세요.',
          undefined,
          'error'
        );
      }
    } finally {
      isVerifyingBusinessRef.current = false;
      setIsVerifyingBusiness(false);
    }
  }, [businessNumber, openingDate, representativeName, userRepository, showToast]);

  const handleKakaoSuccess = useCallback((info: KakaoUserInfo) => {
    setName(info.name);
    setEmail(info.email);
    if (info.kakaoId) {
      setKakaoId(info.kakaoId);
    }
  }, []);

  const handleSignup = useCallback(async () => {
    if (!isPhoneVerified) {
      showToast('휴대폰 인증을 완료해 주세요.', undefined, 'error');
      return;
    }

    const formData = {
      name,
      email,
      password,
      passwordConfirm,
      phone,
      kakaoId,
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
    } catch (err: unknown) {
      // 409 에러인 경우 (중복 이메일 + 같은 역할)
      if (err && typeof err === 'object' && 'status' in err && err.status === 409) {
        const apiError = err as { status: number; payload?: { userMessage?: string } };
        const userMessage = apiError.payload?.userMessage || '이미 해당 역할로 가입된 이메일입니다.';
        
        // 다른 역할로 가입 가능하다는 안내 추가
        const otherRole = userType === 'brand' ? '쇼호스트' : '브랜드';
        const fullMessage = `${userMessage}\n같은 이메일로 ${otherRole} 역할로는 가입할 수 있습니다.`;
        
        showToast(fullMessage, undefined, 'error');
      }
      // 다른 에러는 ApiErrorToastListener에서 처리
      logError('useSignupForm', '회원가입 실패', err);
    } finally {
      setIsLoading(false);
    }
  }, [
    isPhoneVerified,
    name,
    email,
    password,
    passwordConfirm,
    phone,
    kakaoId,
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
    isFromKakao: Boolean(kakaoId),
    kakaoId,
    brandName,
    companyName,
    businessNumber,
    nickname,
    snsLink,
    introduction,
    isLoading,
    isPhoneVerified,
    verificationCode,
    setVerificationCode,
    timer,
    hasRequestedCode,
    setUserType,
    setName,
    setEmail,
    setPassword,
    setPasswordConfirm,
    setPhone,
    setKakaoId,
    setBrandName,
    setCompanyName,
    setBusinessNumber,
    setNickname,
    setSnsLink,
    setIntroduction,
    handleSignup,
    handleSendSmsCode,
    handleVerifyCode,
    handleVerifyBusiness,
    handleKakaoSuccess,
    kakaoAuth: { loginWithKakao, isLoading: isLoadingKakao },
    isVerifyingBusiness,
    businessVerificationResult,
    openingDate,
    representativeName,
    setOpeningDate,
    setRepresentativeName,
  };
};
