import type { Meta, StoryObj } from '@storybook/react';
import ListItem from '@/presentation/components/list/ListItem';
import VerticalList from '@/presentation/components/list/VerticalList';
import styled from 'styled-components';

const meta: Meta<typeof ListItem> = {
  title: 'Lists/ListItem',
  component: ListItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '세로 리스트에서 각 행을 표현하는 기본 아이템 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text', description: '아이템 내부 내용' },
    onTap: { action: 'item clicked', description: '아이템 클릭 시 실행되는 함수' },
  },
};

export default meta;
type Story = StoryObj<typeof ListItem>;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.95rem;
`;

const Value = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

export const Default: Story = {
  render: (args) => (
    <VerticalList>
      <ListItem {...args}>
        <Row>
          <span>브랜드</span>
          <Value>LivBee</Value>
        </Row>
      </ListItem>
      <ListItem>
        <Row>
          <span>카테고리</span>
          <Value>패션 · 뷰티</Value>
        </Row>
      </ListItem>
      <ListItem>
        <Row>
          <span>촬영 지역</span>
          <Value>서울 · 강남</Value>
        </Row>
      </ListItem>
    </VerticalList>
  ),
  args: {
    onTap: () => alert('리스트 아이템을 클릭했습니다.'),
  },
  parameters: {
    docs: {
      description: {
        story: 'VerticalList와 함께 사용할 때의 기본 예시입니다.',
      },
    },
  },
};

export const WithoutDivider: Story = {
  render: () => (
    <VerticalList showDividers={false}>
      <ListItem>
        <strong>라이브 제목</strong>
      </ListItem>
      <ListItem>
        <p style={{ margin: 0 }}>이번 주 금요일 오후 8시 라이브 방송입니다.</p>
      </ListItem>
      <ListItem>
        <button type="button" style={{ width: '100%' }}>
          라이브 상세 보기
        </button>
      </ListItem>
    </VerticalList>
  ),
  parameters: {
    docs: {
      description: {
        story: 'showDividers를 false로 설정하면 아이템 사이 구분선이 사라집니다.',
      },
    },
  },
};


