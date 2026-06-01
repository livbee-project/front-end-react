import React from 'react';
import styled from 'styled-components';
import Tag from '@/presentation/components/ui/Tag';

export const TagVariantsSection: React.FC = () => (
  <VariantContainer>
    <VariantRow>
      <VariantLabel>Rounded</VariantLabel>
      <TagGroup>
        <Tag label="태그1" variant="rounded" />
        <Tag label="태그2" variant="rounded" />
        <Tag label="긴 태그 이름" variant="rounded" />
      </TagGroup>
    </VariantRow>
    <VariantRow>
      <VariantLabel>Circle</VariantLabel>
      <TagGroup>
        <Tag label="A" variant="circle" />
        <Tag label="B" variant="circle" />
        <Tag label="CH" variant="circle" />
      </TagGroup>
    </VariantRow>
  </VariantContainer>
);

export const TagClickableSection: React.FC = () => (
  <ClickableContainer>
    <ClickableRow>
      <ClickableLabel>클릭 불가능</ClickableLabel>
      <TagGroup>
        <Tag label="태그1" />
        <Tag label="태그2" />
        <Tag label="태그3" />
      </TagGroup>
    </ClickableRow>
    <ClickableRow>
      <ClickableLabel>클릭 가능</ClickableLabel>
      <TagGroup>
        <Tag label="태그1" onClick={() => alert('태그1 클릭')} />
        <Tag label="태그2" onClick={() => alert('태그2 클릭')} />
        <Tag label="태그3" onClick={() => alert('태그3 클릭')} />
      </TagGroup>
    </ClickableRow>
  </ClickableContainer>
);

export const TagUsageSection: React.FC = () => (
  <ExampleContainer>
    <ExampleCard>
      <ExampleTitle>카테고리 태그</ExampleTitle>
      <TagGroup>
        <Tag label="패션" />
        <Tag label="뷰티" />
        <Tag label="라이프스타일" />
        <Tag label="테크" />
      </TagGroup>
    </ExampleCard>
    <ExampleCard>
      <ExampleTitle>필터 태그 (클릭 가능)</ExampleTitle>
      <TagGroup>
        <Tag label="전체" onClick={() => {}} />
        <Tag label="인기순" onClick={() => {}} />
        <Tag label="최신순" onClick={() => {}} />
      </TagGroup>
    </ExampleCard>
    <ExampleCard>
      <ExampleTitle>브랜드 태그 (Circle)</ExampleTitle>
      <TagGroup>
        <Tag label="CH" variant="circle" />
        <Tag label="A" variant="circle" />
        <Tag label="B" variant="circle" />
      </TagGroup>
    </ExampleCard>
  </ExampleContainer>
);

const VariantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const VariantRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const VariantLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const TagGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const ClickableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ClickableRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ClickableLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ExampleCard = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ExampleTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

