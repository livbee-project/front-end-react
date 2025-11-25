import type { Meta, StoryObj } from '@storybook/react';
import SearchInput from './SearchInput';
import styled from 'styled-components';
import React, { useState } from 'react';

const meta: Meta<typeof SearchInput> = {
  title: 'Navigation/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '검색 입력 컴포넌트입니다. 모집공고, 포트폴리오 등에서 사용되는 공통 검색바 UI입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '플레이스홀더 텍스트',
    },
    onSearchSubmit: {
      action: 'search submitted',
      description: '엔터 키 입력 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

// ===== 기본 검색 =====
export const Default: Story = {
  args: {
    placeholder: '검색',
  },
};

// ===== 다양한 플레이스홀더 =====
const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
`;

export const Placeholders: Story = {
  render: () => (
    <PlaceholderContainer>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          모집공고 검색
        </label>
        <SearchInput placeholder="모집공고를 검색하세요" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          포트폴리오 검색
        </label>
        <SearchInput placeholder="포트폴리오를 검색하세요" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          모델 검색
        </label>
        <SearchInput placeholder="모델명을 검색하세요" />
      </div>
    </PlaceholderContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 플레이스홀더를 가진 검색 입력 필드입니다.',
      },
    },
  },
};

// ===== 검색 제출 =====
export const WithSubmit: Story = {
  render: () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
      <div style={{ maxWidth: '600px' }}>
        <SearchInput
          placeholder="검색어를 입력하고 Enter를 누르세요"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearchSubmit={(value) => {
            alert(`검색어: ${value}`);
          }}
        />
        {searchTerm && (
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#717182' }}>
            입력된 검색어: {searchTerm}
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '엔터 키를 누르면 onSearchSubmit 콜백이 실행됩니다.',
      },
    },
  },
};

// ===== 다양한 상태 =====
const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
`;

export const States: Story = {
  render: () => (
    <StateContainer>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          기본 상태
        </label>
        <SearchInput placeholder="검색어를 입력하세요" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          값이 있는 상태
        </label>
        <SearchInput placeholder="검색어를 입력하세요" defaultValue="검색어" />
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
          비활성화
        </label>
        <SearchInput placeholder="검색어를 입력하세요" disabled />
      </div>
    </StateContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: '검색 입력 필드의 다양한 상태입니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => {
    const [campaignSearch, setCampaignSearch] = useState('');
    const [portfolioSearch, setPortfolioSearch] = useState('');

    return (
      <StateContainer>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 700 }}>
            모집공고 페이지
          </h3>
          <SearchInput
            placeholder="모집공고를 검색하세요"
            value={campaignSearch}
            onChange={(e) => setCampaignSearch(e.target.value)}
            onSearchSubmit={(value) => {
              alert(`모집공고 검색: ${value}`);
            }}
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 700 }}>
            포트폴리오 페이지
          </h3>
          <SearchInput
            placeholder="포트폴리오를 검색하세요"
            value={portfolioSearch}
            onChange={(e) => setPortfolioSearch(e.target.value)}
            onSearchSubmit={(value) => {
              alert(`포트폴리오 검색: ${value}`);
            }}
          />
        </div>
      </StateContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 다양한 페이지에서 검색 기능으로 사용할 수 있습니다.',
      },
    },
  },
};

