import React from 'react';
import styled from 'styled-components';

interface HomeSectionProps {
  title: React.ReactNode;
  onMore?: () => void;
  children: React.ReactNode;
}

const highlightMap: Record<string, string> = {
  '지금 뜨는 쇼핑라이브': '쇼핑라이브',
  '브랜드 PICK': 'PICK',
  '라이비 뉴스': '뉴스',
  '이런 쇼호스트는 어떠세요?': '쇼호스트는 어떠세요?',
  '컨셉에 맞는 모델 찾기': '모델 찾기',
  '이런 모델은 어떠세요?': '모델',
  'HOT CLIP': 'HOT',
};

const SectionWrapper = styled.section`
  padding: 1rem 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 1.5rem 0;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 2rem 0;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

const MoreButton = styled.button`
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background-color: ${({ theme }) => theme.primaryOpacity['10']};
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.primaryOpacity['20']};
  }
`;

export const HorizontalScroll = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  overflow-y: visible;
  padding: 0.5rem 0;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const HomeSection: React.FC<HomeSectionProps> = ({ title, onMore, children }) => {
  const renderTitleWithHighlight = () => {
    if (typeof title !== 'string') {
      return title;
    }

    const highlightText = highlightMap[title];
    if (!highlightText) {
      return title;
    }

    const highlightIndex = title.indexOf(highlightText);
    if (highlightIndex === -1) {
      return title;
    }

    const beforeText = title.substring(0, highlightIndex);
    const highlightPart = title.substring(highlightIndex, highlightIndex + highlightText.length);
    const afterText = title.substring(highlightIndex + highlightText.length);

    return (
      <>
        {beforeText && <span>{beforeText}</span>}
        <Highlight>{highlightPart}</Highlight>
        {afterText && <span>{afterText}</span>}
      </>
    );
  };

  return (
    <SectionWrapper>
      <Header>
        <Title>{renderTitleWithHighlight()}</Title>
        {onMore && <MoreButton onClick={onMore}>MORE</MoreButton>}
      </Header>
      {children}
    </SectionWrapper>
  );
};

export default HomeSection;

