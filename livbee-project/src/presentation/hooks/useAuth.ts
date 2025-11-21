import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRepository } from '@/data/repositories/UserRepository';
import { setToken, removeToken, getToken } from '@/shared/utils/storage';
import { useRepository } from '@/presentation/hooks/useRepository';
import type { LoginRequest, SignupRequest, User } from '@/domain/entities/User';

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
interface UseAuthReturn extends AuthState {
  login: (request: LoginRequest) => Promise<void>;
  signup: (request: SignupRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

/**
 * 인증 관련 React Hook
 * 로그인, 로그아웃, 사용자 정보 관리
 */
export const useAuth = (): UseAuthReturn => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
    isLoading: true,
  });

  // userRepository를 useRepository 훅으로 관리
  const userRepository = useRepository(UserRepository);

  /**
   * 내 정보 조회하여 사용자 상태 업데이트
   */
  const refreshUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setAuthState({
        isLoggedIn: false,
        user: null,
        isLoading: false,
      });
      return;
    }

    try {
      const meResponse = await userRepository.getMe();
      setAuthState({
        isLoggedIn: true,
        user: {
          id: meResponse.id,
          name: meResponse.name,
          role: meResponse.role,
        },
        isLoading: false,
      });
    } catch (error) {
      // 토큰이 유효하지 않은 경우
      removeToken();
      setAuthState({
        isLoggedIn: false,
        user: null,
        isLoading: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // userRepository는 ref로 관리되므로 의존성 배열에서 제외

  /**
   * 초기 로드 시 토큰 확인 및 사용자 정보 조회
   */
  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const loadUser = async () => {
      const token = getToken();
      if (!token) {
        if (!isCancelled) {
          setAuthState({
            isLoggedIn: false,
            user: null,
            isLoading: false,
          });
        }
        return;
      }

      try {
        const meResponse = await userRepository.getMe(abortController.signal);
        if (!isCancelled && !abortController.signal.aborted) {
          setAuthState({
            isLoggedIn: true,
            user: {
              id: meResponse.id,
              name: meResponse.name,
              role: meResponse.role,
            },
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
          removeToken();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // userRepository는 ref로 관리되므로 의존성 배열에서 제외

  /**
   * 로그인
   */
  const login = useCallback(
    async (request: LoginRequest) => {
      try {
        const loginResponse = await userRepository.login(request);
        
        // 토큰 저장
        setToken(loginResponse.token);

        // 사용자 정보 업데이트
        setAuthState({
          isLoggedIn: true,
          user: {
            id: loginResponse.userId || '', // 백엔드 응답의 user.id 사용
            name: loginResponse.name,
            role: loginResponse.role,
          },
          isLoading: false,
        });

        // 마이페이지로 이동
        navigate('/mypage', { replace: true });
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [userRepository, navigate]
  );

  /**
   * 회원가입
   */
  const signup = useCallback(
    async (request: SignupRequest) => {
      try {
        await userRepository.signup(request);
        // 회원가입 성공 후 자동 로그인은 하지 않음 (사용자가 직접 로그인해야 함)
      } catch (error) {
        throw error;
      }
    },
    [userRepository]
  );

  /**
   * 로그아웃
   */
  const logout = useCallback(() => {
    removeToken();
    setAuthState({
      isLoggedIn: false,
      user: null,
      isLoading: false,
    });
    navigate('/login', { replace: true });
  }, [navigate]);

  return {
    ...authState,
    login,
    signup,
    logout,
    refreshUser,
  };
};

