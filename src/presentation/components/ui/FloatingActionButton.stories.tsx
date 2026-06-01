import { palette } from '@/presentation/styles/tokens';
import type { Meta, StoryObj } from '@storybook/react';
import FloatingActionButton from '@/presentation/components/ui/FloatingActionButton';
import styled from 'styled-components';

const meta: Meta<typeof FloatingActionButton> = {
  title: 'UI Components/FloatingActionButton',
  component: FloatingActionButton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '오른쪽 하단에 고정되는 플로팅 액션 버튼 컴포넌트입니다. 컨텐츠 영역의 최대 너비를 기준으로 위치가 조정됩니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FloatingActionButton>;

// ===== 기본 FAB =====
const FullScreenWrapper = styled.div`
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Default: Story = {
  render: () => (
    <FullScreenWrapper>
      <p>스크롤하여 FAB 위치를 확인하세요.</p>
      <p>오른쪽 하단에 고정된 버튼이 표시됩니다.</p>
      <div style={{ height: '200vh', padding: '20px' }}>
        <p>긴 콘텐츠 영역</p>
        <FloatingActionButton onClick={() => alert('FAB 클릭')} />
      </div>
    </FullScreenWrapper>
  ),
};

// ===== 다양한 상태 =====
export const States: Story = {
  render: () => (
    <FullScreenWrapper>
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          클릭 가능
        </h3>
        <div style={{ height: '400px', position: 'relative', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <FloatingActionButton onClick={() => alert('FAB 클릭')} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>
          클릭 불가능 (onClick 없음)
        </h3>
        <div style={{ height: '400px', position: 'relative', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <FloatingActionButton />
        </div>
      </div>
    </FullScreenWrapper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'FAB의 다양한 상태입니다. onClick이 없으면 클릭할 수 없습니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
const ExampleContainer = styled.div`
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const ContentArea = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  min-height: 80vh;
`;

export const UsageExamples: Story = {
  render: () => (
    <ExampleContainer>
      <ContentArea>
        <h2 style={{ marginBottom: '20px' }}>리스트 페이지</h2>
        <p>이 페이지는 최대 너비 1200px로 제한되어 있습니다.</p>
        <p>FAB는 컨텐츠 영역의 오른쪽 하단에 위치합니다.</p>
        <div style={{ marginTop: '40px' }}>
          <h3>리스트 아이템들...</h3>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i} style={{ padding: '16px', marginBottom: '8px', backgroundColor: 'white', borderRadius: '8px' }}>
              아이템 {i + 1}
            </div>
          ))}
        </div>
        <FloatingActionButton onClick={() => alert('새 항목 추가')} />
      </ContentArea>
    </ExampleContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 리스트 페이지에서 새 항목을 추가할 때 사용됩니다.',
      },
    },
  },
};

