import React from 'react';
import styled from 'styled-components';
import type { SectionHeaderProps } from '@/types/components';

const highlightMap: Record<string, string> = {
  '지금 뜨는 쇼핑라이브': '쇼핑라이브',
  '브랜드 PICK': 'PICK',
  '라이비 뉴스': '뉴스',
  '이런 쇼호스트는 어떠세요?': '쇼호스트는 어떠세요?',
  '컨셉에 맞는 모델 찾기': '모델 찾기',
  'HOT CLIP': 'HOT',
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${({ theme }) => `${theme.spacing['2xl']} ${theme.spacing.md} ${theme.spacing.xl}`};
`;

const TitleText = styled.span`
  font: ${({ theme }) => theme.fonts.h1};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
`;

const HighlightText = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const MoreButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  font: ${({ theme }) => theme.fonts.h2};
  font-weight: 700;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  transition: color 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HomeSectionHeader: React.FC<SectionHeaderProps> = ({ title, onMorePressed }) => {
  const renderTitleWithHighlight = () => {
    const highlightText = highlightMap[title];
    if (!highlightText) {
      return <span>{title}</span>;
    }

    const highlightIndex = title.indexOf(highlightText);
    if (highlightIndex === -1) {
      return <span>{title}</span>;
    }

    const beforeText = title.substring(0, highlightIndex);
    const highlightPart = title.substring(highlightIndex, highlightIndex + highlightText.length);
    const afterText = title.substring(highlightIndex + highlightText.length);

    return (
      <>
        {beforeText && <span>{beforeText}</span>}
        <HighlightText>{highlightPart}</HighlightText>
        {afterText && <span>{afterText}</span>}
      </>
    );
  };

  return (
    <HeaderWrapper>
      <TitleText>
        {renderTitleWithHighlight()}
      </TitleText>
      {onMorePressed && (
        <MoreButton type="button" onClick={onMorePressed}>
          더보기
        </MoreButton>
      )}
    </HeaderWrapper>
  );
};

export default HomeSectionHeader;

