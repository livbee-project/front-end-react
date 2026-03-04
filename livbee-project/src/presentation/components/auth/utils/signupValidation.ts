import type { SignupRequest } from '@/domain/entities/User';
import { removePhoneHyphens } from '@/shared/utils/formatUtils';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  kakaoId?: string;
  brandName?: string;
  companyName?: string;
  businessNumber?: string;
  nickname?: string;
  snsLink?: string;
  introduction?: string;
  role: 'brand' | 'showhost';
}

export const validateSignupForm = (data: SignupFormData): string | null => {
  if (!data.name || data.name.trim().length === 0) {
    return '이름을 입력해주세요.';
  }

  if (!data.email || data.email.trim().length === 0) {
    return '이메일을 입력해주세요.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return '올바른 이메일 형식을 입력해주세요.';
  }

  const isKakaoSignup = Boolean(data.kakaoId?.trim());
  if (!isKakaoSignup) {
    if (!data.password || data.password.length === 0) {
      return '비밀번호를 입력해주세요.';
    }
    if (data.password.length < 8) {
      return '비밀번호는 8자 이상이어야 합니다.';
    }
    if (data.password !== data.passwordConfirm) {
      return '비밀번호가 일치하지 않습니다.';
    }
  }

  if (!data.phone || data.phone.trim().length === 0) {
    return '전화번호를 입력해주세요.';
  }

  const phoneDigits = removePhoneHyphens(data.phone.trim());
  if (phoneDigits.length < 10 || phoneDigits.length > 11) {
    return '올바른 전화번호 형식을 입력해주세요. (10-11자리)';
  }

  if (data.role === 'brand') {
    if (!data.brandName || data.brandName.trim().length === 0) {
      return '브랜드명을 입력해주세요.';
    }
  }

  return null;
};

export const buildSignupRequest = (data: SignupFormData): SignupRequest => {
  const phoneWithoutHyphens = removePhoneHyphens(data.phone.trim());

  const trimOrUndefined = (value?: string): string | undefined => {
    const trimmed = value?.trim();
    return trimmed && trimmed.length > 0 ? trimmed : undefined;
  };

  const isKakaoSignup = Boolean(trimOrUndefined(data.kakaoId));
  const passwordOrUndefined = isKakaoSignup ? undefined : data.password;

  if (data.role === 'brand') {
    return {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      ...(passwordOrUndefined !== undefined && { password: passwordOrUndefined }),
      role: 'brand',
      phone: phoneWithoutHyphens,
      brandName: data.brandName?.trim() || '',
      companyName: trimOrUndefined(data.companyName),
      businessNumber: trimOrUndefined(data.businessNumber),
      kakaoId: trimOrUndefined(data.kakaoId),
    };
  }

  return {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    ...(passwordOrUndefined !== undefined && { password: passwordOrUndefined }),
    role: 'showhost',
    phone: phoneWithoutHyphens,
    nickname: trimOrUndefined(data.nickname),
    snsLink: trimOrUndefined(data.snsLink),
    introduction: trimOrUndefined(data.introduction),
    kakaoId: trimOrUndefined(data.kakaoId),
  };
};
