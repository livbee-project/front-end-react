import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart } from 'lucide-react';
import { ButtonBase } from '@/presentation/components/styled/CommonStyles';
import { Caption } from '@/presentation/components/styled/Typography';
import type { ActionSectionProps } from '@/types/components';

const Section = styled.section`
  max-width: 672px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const ScrapButton = styled(ButtonBase)<{ $isScraped: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ $isScraped, theme }) =>
    $isScraped ? theme.colors.primary : 'transparent'};
  color: ${({ $isScraped, theme }) =>
    $isScraped ? theme.colors.primaryForeground : theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  transition: background-color 0.2s, color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ $isScraped, theme }) =>
      $isScraped ? theme.colors.primaryHover : theme.colors.secondary};
  }
`;

const OfferButton = styled(ButtonBase)`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  border: none;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/**
 * 상세 페이지 하단의 액션 섹션 컴포넌트입니다.
 * 찜하기와 제안하기 버튼을 2개 균등 분할로 표시합니다.
 */
const ActionSection: React.FC<ActionSectionProps> = ({
  isScraped: initialIsScraped = false,
  isReceivingOffers = false,
  onScrap,
  onOffer,
}) => {
  const [isScraped, setIsScraped] = useState(initialIsScraped);

  const handleScrap = () => {
    const newScraped = !isScraped;
    setIsScraped(newScraped);
    if (onScrap) {
      onScrap();
    }
  };

  const handleOffer = () => {
    if (onOffer && isReceivingOffers) {
      onOffer();
    }
  };

  return (
    <Section>
      <ScrapButton $isScraped={isScraped} onClick={handleScrap}>
        <Heart size={20} fill={isScraped ? 'currentColor' : 'none'} />
        <Caption>{isScraped ? '찜 완료' : '찜하기'}</Caption>
      </ScrapButton>
      <OfferButton
        onClick={handleOffer}
        disabled={!isReceivingOffers}
      >
        <Caption>제안하기</Caption>
      </OfferButton>
    </Section>
  );
};

export default ActionSection;

