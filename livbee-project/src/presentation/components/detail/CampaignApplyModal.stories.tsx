import type { Meta, StoryObj } from '@storybook/react';
import CampaignApplyModal from './CampaignApplyModal';
import { useState } from 'react';
import Button from '@/presentation/components/ui/Button';
import { ToastProvider } from '@/presentation/contexts/ToastContext';
import { MemoryRouter } from 'react-router-dom';
import styled from 'styled-components';

const meta: Meta<typeof CampaignApplyModal> = {
  title: 'Detail/CampaignApplyModal',
  component: CampaignApplyModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '캠페인 지원 모달 컴포넌트입니다. 포트폴리오 선택, 메시지 작성, 촬영 가능 일정을 입력할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림 상태',
    },
    campaignTitle: {
      control: 'text',
      description: '캠페인 제목',
    },
    onClose: {
      action: 'closed',
      description: '모달 닫기 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CampaignApplyModal>;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

// ===== 기본 모달 =====
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <MemoryRouter>
        <ToastProvider>
          <Container>
            <Button onClick={() => setIsOpen(true)}>지원하기 모달 열기</Button>
            <CampaignApplyModal
              isOpen={isOpen}
              campaignTitle="2024 봄/여름 패션 라이브 쇼핑"
              onClose={() => setIsOpen(false)}
            />
          </Container>
        </ToastProvider>
      </MemoryRouter>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '기본 캠페인 지원 모달입니다. 포트폴리오 선택, 메시지 작성, 일정 입력이 가능합니다.',
      },
    },
  },
};

// ===== 다양한 캠페인 제목 =====
export const DifferentCampaigns: Story = {
  render: () => {
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen3, setIsOpen3] = useState(false);

    return (
      <MemoryRouter>
        <ToastProvider>
          <Container>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Button onClick={() => setIsOpen1(true)}>패션 캠페인</Button>
              <Button onClick={() => setIsOpen2(true)} variant="outline">
                뷰티 캠페인
              </Button>
              <Button onClick={() => setIsOpen3(true)} variant="secondary">
                리빙 캠페인
              </Button>
            </div>
            <CampaignApplyModal
              isOpen={isOpen1}
              campaignTitle="2024 봄/여름 패션 라이브 쇼핑"
              onClose={() => setIsOpen1(false)}
            />
            <CampaignApplyModal
              isOpen={isOpen2}
              campaignTitle="신제품 뷰티 제품 리뷰 및 소개"
              onClose={() => setIsOpen2(false)}
            />
            <CampaignApplyModal
              isOpen={isOpen3}
              campaignTitle="홈데코 및 리빙 아이템 큐레이션"
              onClose={() => setIsOpen3(false)}
            />
          </Container>
        </ToastProvider>
      </MemoryRouter>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 캠페인 제목을 가진 지원 모달입니다.',
      },
    },
  },
};

// ===== 긴 캠페인 제목 =====
export const LongCampaignTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <MemoryRouter>
        <ToastProvider>
          <Container>
            <Button onClick={() => setIsOpen(true)}>긴 제목 모달 열기</Button>
            <CampaignApplyModal
              isOpen={isOpen}
              campaignTitle="2024 봄/여름 시즌 신상품 패션 라이브 쇼핑 및 스타일링 가이드"
              onClose={() => setIsOpen(false)}
            />
          </Container>
        </ToastProvider>
      </MemoryRouter>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '긴 캠페인 제목이 표시되는 모달입니다.',
      },
    },
  },
};

