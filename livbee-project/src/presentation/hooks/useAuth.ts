import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRepository } from '@/data/repositories/UserRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import type { LoginRequest, SignupRequest, User } from '@/domain/entities/User';
import { consumeAuthRedirectPath } from '@/shared/utils/authRedirect';
import { LoginUseCase } from '@/domain/usecases/auth/LoginUseCase';
import { SignupUseCase } from '@/domain/usecases/auth/SignupUseCase';
import { LogoutUseCase } from '@/domain/usecases/auth/LogoutUseCase';
import { GetCurrentUserUseCase } from '@/domain/usecases/auth/GetCurrentUserUseCase';

/**
 * 인증 상태 타입
 */
interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
}

/**
 * useAuth Hook 반환 타입
 */
interface LoginOptions {
  redirectTo?: string;
}

export interface UseAuthReturn extends AuthState {
  login: (request: LoginRequest, options?: LoginOptions) => Promise<void>;
  signup: (request: SignupRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<UseAuthReturn | undefined>(undefined);

/**
 * 인증 관련 React Hook
 * 로그인, 로그아웃, 사용자 정보 관리
 */
const useAuthValue = (): UseAuthReturn => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: true,
  });

  // userRepository를 useRepository 훅으로 관리
  const userRepository = useRepository(UserRepository);

  // UseCase 인스턴스 생성 (메모이제이션)
  const loginUseCase = useMemo(() => new LoginUseCase(userRepository), [userRepository]);
  const signupUseCase = useMemo(() => new SignupUseCase(userRepository), [userRepository]);
  const logoutUseCase = useMemo(() => new LogoutUseCase(), []);
  const getCurrentUserUseCase = useMemo(() => new GetCurrentUserUseCase(userRepository), [userRepository]);

  /**
   * 내 정보 조회하여 사용자 상태 업데이트
   */
  const refreshUser = useCallback(async () => {
    const result = await getCurrentUserUseCase.execute();
    
    setAuthState({
      isLoggedIn: result.isAuthenticated,
      user: result.user,
      isLoading: false,
    });
  }, [getCurrentUserUseCase]);

  /**
   * 초기 로드 시 토큰 확인 및 사용자 정보 조회
   */
  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const loadUser = async () => {
      try {
        const result = await getCurrentUserUseCase.execute(abortController.signal);
        if (!isCancelled && !abortController.signal.aborted) {
          setAuthState({
            isLoggedIn: result.isAuthenticated,
            user: result.user,
            isLoading: false,
          });
        }
      } catch (error) {
        // AbortError는 무시 (요청이 취소된 경우)
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        // 토큰이 유효하지 않은 경우
        if (!isCancelled && !abortController.signal.aborted) {
          setAuthState({
            isLoggedIn: false,
            user: null,
            isLoading: false,
          });
        }
      }
    };

    loadUser();

    // cleanup 함수: 컴포넌트가 언마운트되면 이전 요청을 취소
    return () => {
      isCancelled = true;
      abortController.abort();
    };
  }, [getCurrentUserUseCase]);

  /**
   * 로그인
   */
  const login = useCallback(
    async (request: LoginRequest, options?: LoginOptions) => {
      try {
        const result = await loginUseCase.execute(request);

        // 사용자 정보 업데이트
        setAuthState({
          isLoggedIn: true,
          user: result.user,
          isLoading: false,
        });

        // 로그인 전 접근하려던 경로가 있으면 우선 이동
        const redirectPath = options?.redirectTo || consumeAuthRedirectPath() || '/mypage';
        navigate(redirectPath, { replace: true });
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [loginUseCase, navigate]
  );

  /**
   * 회원가입
   */
  const signup = useCallback(
    async (request: SignupRequest) => {
      await signupUseCase.execute(request);
      // 회원가입 성공 후 자동 로그인은 하지 않음 (사용자가 직접 로그인해야 함)
    },
    [signupUseCase]
  );

  /**
   * 로그아웃
   */
  const logout = useCallback(() => {
    logoutUseCase.execute();
    setAuthState({
      isLoggedIn: false,
      user: null,
      isLoading: false,
    });
    navigate('/login', { replace: true });
  }, [logoutUseCase, navigate]);

  return {
    ...authState,
    login,
    signup,
    logout,
    refreshUser,
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const value = useAuthValue();
  return React.createElement(AuthContext.Provider, { value }, children);
};

export const useAuth = (): UseAuthReturn => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth 훅은 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

