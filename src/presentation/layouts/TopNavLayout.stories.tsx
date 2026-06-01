import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import TopNavLayout from '@/presentation/layouts/TopNavLayout';
import { ToastProvider } from '@/presentation/contexts/ToastContext';
import styled from 'styled-components';

const meta: Meta<typeof TopNavLayout> = {
  title: 'Layouts/TopNavLayout',
  component: TopNavLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '홈 상단 네비게이션과 탭을 포함한 레이아웃입니다. 스크롤 가능한 페이지를 담습니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TopNavLayout>;

const DemoSection = styled.section`
  padding: 24px 16px;
  max-width: 768px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DemoCard = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: 0 10px 30px ${({ theme }) => theme.primaryOpacity['10']};
`;

const DemoPage = ({ title }: { title: string }) => (
  <DemoSection>
    <h2>{title}</h2>
    <DemoCard>탭을 클릭하면 다른 섹션으로 이동합니다.</DemoCard>
    <DemoCard>준비중인 탭은 Toast 안내를 표시합니다.</DemoCard>
  </DemoSection>
);

export const Default: Story = {
  render: () => (
    <MemoryRouter initialEntries={['/']}>
      <ToastProvider>
        <Routes>
          <Route element={<TopNavLayout />}>
            <Route index element={<DemoPage title="홈 섹션" />} />
            <Route path="/news" element={<DemoPage title="뉴스 섹션" />} />
            <Route path="/clips" element={<DemoPage title="숏클립 섹션" />} />
          </Route>
        </Routes>
      </ToastProvider>
    </MemoryRouter>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 라우터 환경과 ToastProvider를 함께 사용해 상단 네비게이션 구조를 보여줍니다.',
      },
    },
  },
};


