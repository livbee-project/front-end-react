import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import HomeNavBar from './HomeNavBar';

const meta: Meta<typeof HomeNavBar> = {
  title: 'Navigation/HomeNavBar',
  component: HomeNavBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '홈 화면 상단에 고정되는 기본 네비게이션 바입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomeNavBar>;

const Page = styled.div`
  min-height: 60vh;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.xl};
`;

export const Default: Story = {
  render: () => (
    <>
      <HomeNavBar />
      <Page>
        <p>상단 네비게이션이 스크롤에 고정되어 있는 모습을 확인할 수 있습니다.</p>
      </Page>
    </>
  ),
};


