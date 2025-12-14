import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import HomeTopTabs from '@/presentation/components/navigation/HomeTopTabs';
import { ToastProvider } from '@/presentation/contexts/ToastContext';

const meta: Meta<typeof HomeTopTabs> = {
  title: 'Navigation/HomeTopTabs',
  component: HomeTopTabs,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '홈 화면 상단 탭 컴포넌트입니다. 준비 중 탭을 클릭하면 토스트 안내가 표시됩니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomeTopTabs>;

const Content = styled.main`
  min-height: 50vh;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
`;

const Page = () => {
  const location = useLocation();
  return (
    <Content>
      <h2>현재 경로: {location.pathname}</h2>
      <p>탭을 클릭하면 라우터가 변경되고, 준비중인 탭은 토스트 알림을 표시합니다.</p>
    </Content>
  );
};

const Playground = () => (
  <MemoryRouter initialEntries={['/']}>
    <ToastProvider>
      <HomeTopTabs />
      <Routes>
        <Route path="*" element={<Page />} />
      </Routes>
    </ToastProvider>
  </MemoryRouter>
);

export const Default: Story = {
  render: () => <Playground />,
};


