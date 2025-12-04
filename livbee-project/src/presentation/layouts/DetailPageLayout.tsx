import React from 'react';
import styled from 'styled-components';

/**
 * DetailPageLayout 컴포넌트가 받을 props 타입을 정의합니다.
 * @param children - 페이지 내부에 렌더링될 컨텐츠
 */
interface DetailPageLayoutProps {
  children: React.ReactNode;
}

const PageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
  padding-bottom: 6rem;
`;

const ContentContainer = styled.div`
  max-width: 672px;
  margin: 0 auto;
  padding: 0 16px 1rem;
  width: 100%;
`;

/**
 * 상세 페이지의 공통 레이아웃 래퍼 컴포넌트입니다.
 * 모든 상세 페이지에 공통으로 적용되는 스타일을 제공합니다.
 */
const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({ children }) => {
  return (
    <PageContainer>
      <ContentContainer>{children}</ContentContainer>
    </PageContainer>
  );
};

export default DetailPageLayout;

