import type { Meta, StoryObj } from '@storybook/react';
import Modal from './Modal';
import Button from './Button';
import styled from 'styled-components';
import React, { useState } from 'react';
import { H2, P } from '@/presentation/components/styled/Typography';

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
const BasicModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <H2>기본 모달</H2>
        <P style={{ marginTop: '16px' }}>
          이것은 기본 모달입니다. 오버레이를 클릭하거나 ESC 키를 누르면 닫힙니다.
        </P>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen(false)}>닫기</Button>
        </div>
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: () => <BasicModalWrapper />,
};

// ===== 다양한 크기 =====
const SizeModalWrapper = () => {
  const [isOpenSmall, setIsOpenSmall] = useState(false);
  const [isOpenMedium, setIsOpenMedium] = useState(false);
  const [isOpenLarge, setIsOpenLarge] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button onClick={() => setIsOpenSmall(true)}>작은 모달</Button>
      <Button onClick={() => setIsOpenMedium(true)}>중간 모달</Button>
      <Button onClick={() => setIsOpenLarge(true)}>큰 모달</Button>

      <Modal
        isOpen={isOpenSmall}
        onClose={() => setIsOpenSmall(false)}
        maxWidth="300px"
        width="90%"
      >
        <H2>작은 모달</H2>
        <P style={{ marginTop: '16px' }}>최대 너비 300px</P>
      </Modal>

      <Modal
        isOpen={isOpenMedium}
        onClose={() => setIsOpenMedium(false)}
        maxWidth="500px"
        width="90%"
      >
        <H2>중간 모달</H2>
        <P style={{ marginTop: '16px' }}>최대 너비 500px</P>
      </Modal>

      <Modal
        isOpen={isOpenLarge}
        onClose={() => setIsOpenLarge(false)}
        maxWidth="800px"
        width="90%"
      >
        <H2>큰 모달</H2>
        <P style={{ marginTop: '16px' }}>최대 너비 800px</P>
      </Modal>
    </div>
  );
};

export const Sizes: Story = {
  render: () => <SizeModalWrapper />,
  parameters: {
    docs: {
      description: {
        story: '다양한 크기의 모달입니다. maxWidth와 width 속성으로 크기를 조절할 수 있습니다.',
      },
    },
  },
};

// ===== 긴 콘텐츠 =====
const LongContentModalWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>긴 콘텐츠 모달</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="600px">
        <H2>긴 콘텐츠 모달</H2>
        <P style={{ marginTop: '16px' }}>
          이 모달은 스크롤 가능한 긴 콘텐츠를 포함합니다. max-height가 90vh로 설정되어 있어
          화면을 벗어나지 않습니다.
        </P>
        {Array.from({ length: 20 }, (_, i) => (
          <P key={i} style={{ marginTop: '16px' }}>
            이것은 {i + 1}번째 문단입니다. 모달이 스크롤 가능하도록 충분한 콘텐츠를 포함하고 있습니다.
          </P>
        ))}
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen(false)}>닫기</Button>
        </div>
      </Modal>
    </>
  );
};

export const LongContent: Story = {
  render: () => <LongContentModalWrapper />,
  parameters: {
    docs: {
      description: {
        story: '긴 콘텐츠가 있는 모달입니다. 자동으로 스크롤이 생성됩니다.',
      },
    },
  },
};

// ===== 닫기 옵션 =====
const CloseOptionsModalWrapper = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button onClick={() => setIsOpen1(true)}>오버레이 클릭 불가</Button>
      <Button onClick={() => setIsOpen2(true)}>ESC 키 불가</Button>
      <Button onClick={() => setIsOpen3(true)}>둘 다 불가</Button>

      <Modal
        isOpen={isOpen1}
        onClose={() => setIsOpen1(false)}
        closeOnOverlayClick={false}
      >
        <H2>오버레이 클릭 불가</H2>
        <P style={{ marginTop: '16px' }}>오버레이를 클릭해도 닫히지 않습니다. ESC 키나 닫기 버튼을 사용하세요.</P>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen1(false)}>닫기</Button>
        </div>
      </Modal>

      <Modal
        isOpen={isOpen2}
        onClose={() => setIsOpen2(false)}
        closeOnEscape={false}
      >
        <H2>ESC 키 불가</H2>
        <P style={{ marginTop: '16px' }}>ESC 키로 닫을 수 없습니다. 오버레이나 닫기 버튼을 사용하세요.</P>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen2(false)}>닫기</Button>
        </div>
      </Modal>

      <Modal
        isOpen={isOpen3}
        onClose={() => setIsOpen3(false)}
        closeOnOverlayClick={false}
        closeOnEscape={false}
      >
        <H2>둘 다 불가</H2>
        <P style={{ marginTop: '16px' }}>오버레이 클릭과 ESC 키 모두 비활성화되었습니다. 닫기 버튼만 사용 가능합니다.</P>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen3(false)}>닫기</Button>
        </div>
      </Modal>
    </div>
  );
};

export const CloseOptions: Story = {
  render: () => <CloseOptionsModalWrapper />,
  parameters: {
    docs: {
      description: {
        story: '모달 닫기 옵션을 제어할 수 있습니다. closeOnOverlayClick과 closeOnEscape 속성으로 설정합니다.',
      },
    },
  },
};

