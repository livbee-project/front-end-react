import type { Meta, StoryObj } from '@storybook/react';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import styled from 'styled-components';

const meta: Meta<typeof RegisterPageLayout> = {
  title: 'Layouts/RegisterPageLayout',
  component: RegisterPageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '캠페인/모델/포트폴리오 등록 페이지에서 사용하는 공통 레이아웃입니다.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RegisterPageLayout>;

const Section = styled.section`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 10px 30px ${({ theme }) => theme.primaryOpacity['10']};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.h3`
  margin: 0;
`;

export const Default: Story = {
  render: () => (
    <RegisterPageLayout>
      <Section>
        <Label>기본 정보</Label>
        <p>등록 페이지의 본문을 감싸는 기본 패딩/여백을 확인할 수 있습니다.</p>
      </Section>
    </RegisterPageLayout>
  ),
  parameters: {
    docs: {
      description: {
        story: '기본 레이아웃과 섹션 구성 예시입니다.',
      },
    },
  },
};

export const MultipleSections: Story = {
  render: () => (
    <RegisterPageLayout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <Section>
          <Label>1. 기본 정보</Label>
          <p>모델/포트폴리오 등록 시 사용하는 기본 입력 영역.</p>
        </Section>
        <Section>
          <Label>2. 상세 소개</Label>
          <p>텍스트 영역, 파일 업로드 등 모든 컨텐츠를 균일한 패딩으로 감쌉니다.</p>
        </Section>
      </div>
    </RegisterPageLayout>
  ),
};


