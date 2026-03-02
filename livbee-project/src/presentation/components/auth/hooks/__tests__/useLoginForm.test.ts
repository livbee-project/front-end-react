import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useLoginForm } from '@/presentation/components/auth/hooks/useLoginForm';

const mockShowToast = vi.fn();

vi.mock('@/presentation/hooks/auth/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn().mockResolvedValue(undefined),
    logout: vi.fn(),
    isLoggedIn: false,
  }),
}));

vi.mock('@/presentation/contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(MemoryRouter, null, children);

describe('useLoginForm', () => {
  beforeEach(() => {
    mockShowToast.mockClear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper });
    expect(result.current.userType).toBe('brand');
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('should validate empty fields and show error toast', async () => {
    const { result } = renderHook(() => useLoginForm(), { wrapper });

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockShowToast).toHaveBeenCalledWith(expect.any(String), undefined, 'error');
  });
});

