import React, { useState } from 'react';
import styled from 'styled-components';
import SearchInput from '@/presentation/components/search/SearchInput';

export const SearchPlaceholderDemo: React.FC = () => (
  <PlaceholderContainer>
    <LabelGroup label="모집공고 검색">
      <SearchInput placeholder="모집공고를 검색하세요" />
    </LabelGroup>
    <LabelGroup label="포트폴리오 검색">
      <SearchInput placeholder="포트폴리오를 검색하세요" />
    </LabelGroup>
    <LabelGroup label="모델 검색">
      <SearchInput placeholder="모델명을 검색하세요" />
    </LabelGroup>
  </PlaceholderContainer>
);

export const SearchSubmitDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div style={{ maxWidth: '600px' }}>
      <SearchInput
        placeholder="검색어를 입력하고 Enter를 누르세요"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onSearchSubmit={(value) => alert(`검색어: ${value}`)}
      />
      {searchTerm && (
        <HelperText>입력된 검색어: {searchTerm}</HelperText>
      )}
    </div>
  );
};

export const SearchStateDemo: React.FC = () => (
  <StateContainer>
    <LabelGroup label="기본 상태">
      <SearchInput placeholder="검색어를 입력하세요" />
    </LabelGroup>
    <LabelGroup label="값이 있는 상태">
      <SearchInput placeholder="검색어를 입력하세요" defaultValue="검색어" />
    </LabelGroup>
    <LabelGroup label="비활성화">
      <SearchInput placeholder="검색어를 입력하세요" disabled />
    </LabelGroup>
  </StateContainer>
);

export const SearchUsageDemo: React.FC = () => {
  const [campaignSearch, setCampaignSearch] = useState('');
  const [portfolioSearch, setPortfolioSearch] = useState('');

  return (
    <UsageContainer>
      <Section>
        <SectionTitle>모집공고 페이지</SectionTitle>
        <SearchInput
          placeholder="모집공고를 검색하세요"
          value={campaignSearch}
          onChange={(e) => setCampaignSearch(e.target.value)}
          onSearchSubmit={(value) => alert(`모집공고 검색: ${value}`)}
        />
      </Section>
      <Section>
        <SectionTitle>포트폴리오 페이지</SectionTitle>
        <SearchInput
          placeholder="포트폴리오를 검색하세요"
          value={portfolioSearch}
          onChange={(e) => setPortfolioSearch(e.target.value)}
          onSearchSubmit={(value) => alert(`포트폴리오 검색: ${value}`)}
        />
      </Section>
    </UsageContainer>
  );
};

const PlaceholderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
`;

const HelperText = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const StateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: 600px;
`;

const UsageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SectionTitle = styled.h3`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: 16px;
  font-weight: 700;
`;

interface LabelGroupProps {
  label: string;
  children: React.ReactNode;
}

const LabelGroup: React.FC<LabelGroupProps> = ({ label, children }) => (
  <div>
    <Label>{label}</Label>
    {children}
  </div>
);

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
`;

