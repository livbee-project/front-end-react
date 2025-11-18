import React from 'react';
import styled from 'styled-components';

interface HomeSectionProps {
  title: React.ReactNode;
  onMore?: () => void;
  children: React.ReactNode;
}

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
  background-color: rgba(104, 124, 244, 0.1);
  color: ${({ theme }) => theme.colors.primary};
  padding: 0.25rem 0.75rem;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(104, 124, 244, 0.2);
  }
`;

export const HorizontalScroll = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const HomeSection: React.FC<HomeSectionProps> = ({ title, onMore, children }) => (
  <SectionWrapper>
    <Header>
      <Title>{title}</Title>
      {onMore && <MoreButton onClick={onMore}>MORE</MoreButton>}
    </Header>
    {children}
  </SectionWrapper>
);

export default HomeSection;

