import React from 'react';
import styled from 'styled-components';
import PlaceholderImage from './PlaceholderImage';

export const PlaceholderSizesSection: React.FC = () => (
  <SizeContainer>
    {[24, 32, 48, 64, 96].map((size) => (
      <SizeItem key={size}>
        <PlaceholderImage size={size} />
        <SizeLabel>{size}px{size === 48 ? ' (기본값)' : ''}</SizeLabel>
      </SizeItem>
    ))}
  </SizeContainer>
);

export const PlaceholderOpacitySection: React.FC = () => {
  const opacities = [
    { value: 1.0, label: 'opacity: 1.0' },
    { value: 0.7, label: 'opacity: 0.7' },
    { value: 0.5, label: 'opacity: 0.5 (기본값)' },
    { value: 0.3, label: 'opacity: 0.3' },
  ];

  return (
    <OpacityContainer>
      {opacities.map(({ value, label }) => (
        <OpacityItem key={value}>
          <PlaceholderImage size={48} opacity={value} />
          <OpacityLabel>{label}</OpacityLabel>
        </OpacityItem>
      ))}
    </OpacityContainer>
  );
};

export const PlaceholderUsageSection: React.FC = () => (
  <ExampleContainer>
    <ExampleCard>
      <ExampleImageContainer>
        <PlaceholderImage size={24} />
      </ExampleImageContainer>
      <ExampleText>
        <ExampleTitle>상품 카드</ExampleTitle>
        <ExampleDescription>이미지가 없을 때 플레이스홀더 표시</ExampleDescription>
      </ExampleText>
    </ExampleCard>

    <ExampleCard>
      <ExampleImageContainer>
        <PlaceholderImage size={32} />
      </ExampleImageContainer>
      <ExampleText>
        <ExampleTitle>프로필 이미지</ExampleTitle>
        <ExampleDescription>프로필 이미지가 없을 때</ExampleDescription>
      </ExampleText>
    </ExampleCard>

    <ExampleCard>
      <ExampleImageContainer>
        <PlaceholderImage size={48} opacity={0.3} />
      </ExampleImageContainer>
      <ExampleText>
        <ExampleTitle>낮은 투명도</ExampleTitle>
        <ExampleDescription>배경과 잘 어울리도록 낮은 투명도 사용</ExampleDescription>
      </ExampleText>
    </ExampleCard>
  </ExampleContainer>
);

const SizeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const SizeItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SizeLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const OpacityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
`;

const OpacityItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const OpacityLabel = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const ExampleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ExampleCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ExampleImageContainer = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const ExampleText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ExampleTitle = styled.div`
  font-weight: 600;
`;

const ExampleDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

