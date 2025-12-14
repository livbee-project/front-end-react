import type { Meta, StoryObj } from '@storybook/react';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import styled from 'styled-components';

const meta: Meta<typeof VerticalList> = {
  title: 'Lists/VerticalList',
  component: VerticalList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '자식 아이템 사이에 구분선을 자동으로 렌더링해 주는 세로 리스트 컨테이너입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showDividers: {
      control: 'boolean',
      description: '아이템 사이 구분선 표시 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VerticalList>;

const ItemTitle = styled.span`
  font-weight: 600;
`;

const ItemDescription = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

export const Default: Story = {
  render: (args) => (
    <VerticalList {...args}>
      <ListItem>
        <ItemTitle>라이브 주제</ItemTitle>
        <p style={{ margin: '8px 0 0' }}>겨울 아우터 특집</p>
      </ListItem>
      <ListItem>
        <ItemTitle>진행 일정</ItemTitle>
        <ItemDescription>12월 3일(화) 오후 8시</ItemDescription>
      </ListItem>
      <ListItem>
        <ItemTitle>진행 장소</ItemTitle>
        <ItemDescription>서울 · 성수</ItemDescription>
      </ListItem>
    </VerticalList>
  ),
  args: {
    showDividers: true,
  },
};

export const WithoutDivider: Story = {
  render: () => (
    <VerticalList showDividers={false}>
      <ListItem>
        <ItemTitle>이벤트 혜택</ItemTitle>
        <ul>
          <li>전 상품 10% 할인</li>
          <li>한정 수량 사은품 제공</li>
        </ul>
      </ListItem>
      <ListItem>
        <ItemTitle>참여 방법</ItemTitle>
        <ItemDescription>라이브 시청 후 바로 주문</ItemDescription>
      </ListItem>
    </VerticalList>
  ),
};


