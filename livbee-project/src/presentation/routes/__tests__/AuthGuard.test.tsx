import { describe, it, expect, vi, beforeEach } from 'vitest';
import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { AuthGuard } from '@/presentation/routes/AuthGuard';

const mockUseAuth = vi.fn();

vi.mock('@/presentation/hooks/useAuth', () => ({
  useAuth: () => mockUseAuth(),
}));

const renderWithRouter = (element: React.ReactElement, initialPath = '/') =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={element} />
        <Route path="/login" element={<div>로그인 페이지</div>} />
        <Route path="/mypage" element={<div>마이페이지</div>} />
      </Routes>
    </MemoryRouter>
  );

describe('AuthGuard', () => {
  beforeEach(() => {
    mockUseAuth.mockReset();
  });

  it('requireAuth=true일 때 로그인 사용자는 자식 컴포넌트를 볼 수 있다', () => {
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      isLoading: false,
      user: { role: 'brand' },
    });

    renderWithRouter(
      <AuthGuard requireAuth>
        <div>보호된 콘텐츠</div>
      </AuthGuard>
    );

    expect(screen.getByText('보호된 콘텐츠')).toBeInTheDocument();
  });

  it('로그인하지 않은 사용자는 로그인 페이지로 리다이렉트된다', () => {
    mockUseAuth.mockReturnValue({
      isLoggedIn: false,
      isLoading: false,
      user: null,
    });

    renderWithRouter(
      <AuthGuard requireAuth>
        <div>보호된 콘텐츠</div>
      </AuthGuard>,
      '/'
    );

    expect(screen.getByText('로그인 페이지')).toBeInTheDocument();
  });

  it('guestOnly=true인 경우 로그인 상태에서 리다이렉트된다', () => {
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      isLoading: false,
      user: { role: 'brand' },
    });

    renderWithRouter(
      <AuthGuard guestOnly redirectTo="/mypage">
        <div>게스트 전용</div>
      </AuthGuard>,
      '/'
    );

    expect(screen.getByText('마이페이지')).toBeInTheDocument();
  });

  it('allowedRoles를 지정하면 해당 역할만 접근 가능하다', () => {
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      isLoading: false,
      user: { role: 'showhost' },
    });

    renderWithRouter(
      <AuthGuard requireAuth allowedRoles={['brand']} redirectTo="/mypage">
        <div>브랜드 전용</div>
      </AuthGuard>,
      '/'
    );

    expect(screen.getByText('마이페이지')).toBeInTheDocument();
  });
});

