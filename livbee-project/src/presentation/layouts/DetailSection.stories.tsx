import type { Meta, StoryObj } from '@storybook/react';
import DetailSection from './DetailSection';
import styled from 'styled-components';

const meta: Meta<typeof DetailSection> = {
  title: 'Layouts/DetailSection',
  component: DetailSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '상세 페이지에서 섹션 제목과 컨텐츠를 감싸는 컨테이너입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '섹션 제목',
    },
    showDivider: {
      control: 'boolean',
      description: '하단 구분선 표시 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DetailSection>;

const Paragraph = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Default: Story = {
  args: {
    title: '■ 캠페인 소개',
    showDivider: true,
    children: (
      <Paragraph>
        쇼핑라이브 진행을 위한 기본 정보를 기재하는 영역입니다. 제목 앞에 ■ 기호를 넣으면 불릿 스타일로 표시됩니다.
      </Paragraph>
    ),
  },
};

export const WithoutDivider: Story = {
  args: {
    title: '세부 조건',
    showDivider: false,
    children: (
      <ul>
        <li>촬영 일정: 12월 15일(토)</li>
        <li>촬영 장소: 서울 · 마포</li>
        <li>필수 준비물: 개인 스타일링</li>
      </ul>
    ),
  },
};


