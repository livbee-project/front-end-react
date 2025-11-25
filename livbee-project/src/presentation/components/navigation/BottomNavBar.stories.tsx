import type { Meta, StoryObj } from '@storybook/react';
import BottomNavBar from './BottomNavBar';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '@/presentation/contexts/ToastContext';
import { AuthProvider } from '@/presentation/hooks/useAuth';
import React from 'react';

// Storybook에서 사용할 간단한 AuthProvider 래퍼
const MockAuthProvider: React.FC<{ children: React.ReactNode; isLoggedIn?: boolean }> = ({ 
  children, 
  isLoggedIn = false 
}) => {
  // useAuth 훅을 모킹하기 위한 간단한 컨텍스트
  return <>{children}</>;
};

const meta: Meta<typeof BottomNavBar> = {
  title: 'Navigation/BottomNavBar',
  component: BottomNavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '화면 하단에 고정되는 공통 네비게이션 바 컴포넌트입니다. 홈, 모집공고, 모델, 포트폴리오, 마이페이지로 이동할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const isLoggedIn = context.args.isLoggedIn ?? false;
      return (
        <MemoryRouter initialEntries={[context.args.initialPath || '/']}>
          <ToastProvider>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, padding: '20px' }}>
                <p>페이지 내용이 여기에 표시됩니다.</p>
                <p>현재 경로: {context.args.initialPath || '/'}</p>
              </div>
              <Story />
            </div>
          </ToastProvider>
        </MemoryRouter>
      );
    },
  ],
  argTypes: {
    initialPath: {
      control: 'select',
      options: ['/', '/campaigns', '/models', '/portfolios', '/mypage'],
      description: '초기 경로',
    },
    isLoggedIn: {
      control: 'boolean',
      description: '로그인 상태',
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNavBar>;

// ===== 기본 네비게이션 =====
export const Default: Story = {
  args: {
    initialPath: '/',
    isLoggedIn: false,
  },
};

// ===== 다양한 경로 =====
export const DifferentPaths: Story = {
  render: () => {
    const paths = ['/', '/campaigns', '/models', '/portfolios', '/mypage'];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {paths.map((path) => (
          <div key={path} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>경로: {path}</h3>
            <MemoryRouter initialEntries={[path]}>
              <ToastProvider>
                <div style={{ position: 'relative', height: '200px', border: '1px solid #f0f0f0' }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <BottomNavBar />
                  </div>
                </div>
              </ToastProvider>
            </MemoryRouter>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 경로에서의 네비게이션 바입니다. 활성화된 탭이 Primary 색상으로 표시됩니다.',
      },
    },
  },
};

// ===== 로그인 상태 =====
export const LoginStates: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>로그인 안 함</h3>
          <MemoryRouter initialEntries={['/']}>
            <ToastProvider>
              <div style={{ position: 'relative', height: '200px', border: '1px solid #f0f0f0' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                  <BottomNavBar />
                </div>
              </div>
            </ToastProvider>
          </MemoryRouter>
        </div>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '20px' }}>
          <h3 style={{ marginBottom: '10px' }}>로그인 함</h3>
          <MemoryRouter initialEntries={['/']}>
            <ToastProvider>
              <div style={{ position: 'relative', height: '200px', border: '1px solid #f0f0f0' }}>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                  <BottomNavBar />
                </div>
              </div>
            </ToastProvider>
          </MemoryRouter>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '로그인 상태에 따른 네비게이션 바입니다. 로그인하지 않은 상태에서 마이페이지를 클릭하면 로그인 페이지로 이동합니다.',
      },
    },
  },
};

