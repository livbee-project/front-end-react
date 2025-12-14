import type { Meta, StoryObj } from '@storybook/react';
import Modal from '@/presentation/components/ui/Modal';
import {
  BasicModalDemo,
  CloseOptionsModalDemo,
  LongContentModalDemo,
  SizeModalDemo,
} from '@/presentation/components/ui/ModalStoryContent';

const meta: Meta<typeof Modal> = {
  title: 'UI Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '공통 모달 베이스 컴포넌트입니다. 오버레이, 컨테이너, 닫기 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: '모달 열림/닫힘 상태',
    },
    maxWidth: {
      control: 'text',
      description: '모달 최대 너비',
    },
    width: {
      control: 'text',
      description: '모달 너비',
    },
    padding: {
      control: 'text',
      description: '모달 패딩',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: '오버레이 클릭 시 닫기 여부',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'ESC 키로 닫기 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// ===== 기본 모달 =====
export const Default: Story = {
  render: () => <BasicModalDemo />,
};

// ===== 다양한 크기 =====
export const Sizes: Story = {
  render: () => <SizeModalDemo />,
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 모달입니다. maxWidth와 width 속성으로 크기를 조절할 수 있습니다.',
      },
    },
  },
};

// ===== 긴 콘텐츠 =====
export const LongContent: Story = {
  render: () => <LongContentModalDemo />,
  parameters: {
    docs: {
      description: {
        story: '긴 콘텐츠가 있는 모달입니다. 자동으로 스크롤이 생성됩니다.',
      },
    },
  },
};

// ===== 닫기 옵션 =====
export const CloseOptions: Story = {
  render: () => <CloseOptionsModalDemo />,
  parameters: {
    docs: {
      description: {
        story: '모달 닫기 옵션을 제어할 수 있습니다. closeOnOverlayClick과 closeOnEscape 속성으로 설정합니다.',
      },
    },
  },
};

