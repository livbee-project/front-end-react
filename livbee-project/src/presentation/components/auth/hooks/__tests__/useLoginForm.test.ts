import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLoginForm } from '@/presentation/components/auth/hooks/useLoginForm';

vi.mock('@/presentation/hooks/useAuth', () => ({
  useAuth: () => ({
    login: vi.fn().mockResolvedValue(undefined),
    isLoggedIn: false,
  }),
}));

vi.mock('@/presentation/contexts/ToastContext', () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

describe('useLoginForm', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useLoginForm());
    expect(result.current.userType).toBe('brand');
    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('should validate empty fields and show error', async () => {
    const { result } = renderHook(() => useLoginForm());

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(result.current.error).toBeDefined();
  });
});

