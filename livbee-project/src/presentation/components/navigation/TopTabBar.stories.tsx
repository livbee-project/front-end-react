import type { Meta, StoryObj } from '@storybook/react';
import TopTabBar from './TopTabBar';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '@/presentation/contexts/ToastContext';
import React from 'react';

const meta: Meta<typeof TopTabBar> = {
  title: 'Navigation/TopTabBar',
  component: TopTabBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '앱 상단에 고정되는 탭 네비게이션 바 컴포넌트입니다. 숏클립, 쇼핑라이브, 뉴스, 이벤트, 서비스로 이동할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      return (
        <MemoryRouter initialEntries={[context.args.initialPath || '/clips']}>
          <ToastProvider>
            <div>
              <Story />
              <div style={{ padding: '20px' }}>
                <p>페이지 내용이 여기에 표시됩니다.</p>
                <p>현재 경로: {context.args.initialPath || '/clips'}</p>
              </div>
            </div>
          </ToastProvider>
        </MemoryRouter>
      );
    },
  ],
  argTypes: {
    initialPath: {
      control: 'select',
      options: ['/clips', '/live', '/news', '/event', '/service'],
      description: '초기 경로',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TopTabBar>;

// ===== 기본 탭 바 =====
export const Default: Story = {
  args: {
    initialPath: '/clips',
  },
};

// ===== 다양한 경로 =====
export const DifferentPaths: Story = {
  render: () => {
    const paths = ['/clips', '/live', '/news', '/event', '/service'];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {paths.map((path) => (
          <div key={path} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
            <h3 style={{ margin: '10px', marginBottom: '0' }}>경로: {path}</h3>
            <MemoryRouter initialEntries={[path]}>
              <ToastProvider>
                <TopTabBar />
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
        story: '다양한 경로에서의 탭 바입니다. 활성화된 탭이 Primary 색상의 밑줄로 표시됩니다.',
      },
    },
  },
};

// ===== 준비중 기능 =====
export const ComingSoon: Story = {
  render: () => {
    const comingSoonPaths = ['/live', '/event', '/service'];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {comingSoonPaths.map((path) => (
          <div key={path} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', overflow: 'hidden' }}>
            <h3 style={{ margin: '10px', marginBottom: '0' }}>준비중: {path}</h3>
            <p style={{ margin: '0 10px 10px', fontSize: '12px', color: '#717182' }}>
              이 경로를 클릭하면 "준비중인 기능입니다." 토스트가 표시됩니다.
            </p>
            <MemoryRouter initialEntries={['/clips']}>
              <ToastProvider>
                <TopTabBar />
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
        story: '준비중인 기능(/live, /event, /service)을 클릭하면 토스트 메시지가 표시됩니다.',
      },
    },
  },
};

