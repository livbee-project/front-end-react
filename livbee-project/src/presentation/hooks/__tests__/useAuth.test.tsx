import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { AuthProvider, useAuth } from '@/presentation/hooks/auth/useAuth';

const mockUserRepository = {
  login: vi.fn(),
  signup: vi.fn(),
  getMe: vi.fn(),
};

const mockSetToken = vi.fn();
const mockRemoveToken = vi.fn();
const mockGetToken = vi.fn(() => null);
const mockNavigate = vi.fn();
const mockConsumeRedirect = vi.fn(() => null);

vi.mock('@/presentation/hooks/common/useRepository', () => ({
  useRepository: () => mockUserRepository,
}));

vi.mock('@/shared/utils/storage', () => ({
  setToken: (...args: unknown[]) => mockSetToken(...args),
  removeToken: (...args: unknown[]) => mockRemoveToken(...args),
  getToken: () => mockGetToken(),
}));

vi.mock('@/shared/utils/authRedirect', () => ({
  consumeAuthRedirectPath: (...args: unknown[]) => mockConsumeRedirect(...args),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('useAuth', () => {
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  beforeEach(() => {
    vi.clearAllMocks();
    mockGetToken.mockReturnValue(null);
    mockUserRepository.login.mockResolvedValue({
      token: 'token',
      name: '테스터',
      role: 'brand',
      userId: '1',
    });
    mockUserRepository.getMe.mockResolvedValue({
      id: '1',
      name: '테스터',
      role: 'brand',
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('로그인 시 상태를 업데이트하고 네비게이션을 수행한다', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: '1234',
        role: 'brand',
      });
    });

    expect(mockSetToken).toHaveBeenCalledWith('token');
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.user?.name).toBe('테스터');
    expect(mockNavigate).toHaveBeenCalledWith('/mypage', { replace: true });
  });

  it('로그아웃 시 토큰을 제거하고 로그인 페이지로 이동한다', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: '1234',
        role: 'brand',
      });
    });

    act(() => {
      result.current.logout();
    });

    expect(mockRemoveToken).toHaveBeenCalled();
    expect(result.current.isLoggedIn).toBe(false);
    expect(mockNavigate).toHaveBeenCalledWith('/login', { replace: true });
  });

  it('refreshUser 호출 시 토큰이 있으면 사용자 정보를 갱신한다', async () => {
    mockGetToken.mockReturnValue('token');
    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.refreshUser();
    });

    expect(mockUserRepository.getMe).toHaveBeenCalled();
    expect(result.current.user?.role).toBe('brand');
  });
});

