import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const AppFooter: React.FC = () => {
  const location = useLocation();
  
  // 메인 페이지(/)에서만 풋터를 표시
  if (location.pathname !== '/') {
    return null;
  }

  return (
    <FooterContainer>
      <FooterContent>
        <PolicyLinks>
          <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
            이용약관
          </PolicyLink>
          <Divider />
          <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
            개인정보처리방침
          </PolicyLink>
          <Divider />
          <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
            운영정책
          </PolicyLink>
          <Divider />
          <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
            청소년보호정책
          </PolicyLink>
          <Divider />
          <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
            사업자정보확인
          </PolicyLink>
          <Divider />
          <PolicyLink href="#" onClick={(e) => e.preventDefault()}>
            고객센터
          </PolicyLink>
        </PolicyLinks>

        <CompanyInfo>
          <CompanyName>라이비</CompanyName>
          <InfoList>
            <InfoItem>
              <InfoLabel>사업자등록번호</InfoLabel>
              <InfoValue>701-31-01824</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>통신판매업신고번호</InfoLabel>
              <InfoValue>2024-서울강남-12345</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>주소</InfoLabel>
              <InfoValue>서울특별시 강남구 영동대로 602 6층 n029 06083</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>대표이메일</InfoLabel>
              <InfoValue>support@livebi.co.kr</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>고객센터</InfoLabel>
              <InfoValue>1588-0000 (평일 09:00 - 18:00)</InfoValue>
            </InfoItem>
          </InfoList>
          <Copyright>© 2024 LIVEBI. All rights reserved.</Copyright>
        </CompanyInfo>
      </FooterContent>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const FooterContent = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 24px ${({ theme }) => theme.layout.pagePadding.mobile};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 32px ${({ theme }) => theme.layout.pagePadding.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 40px ${({ theme }) => theme.layout.pagePadding.desktop};
  }
`;

const PolicyLinks = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PolicyLink = styled.a`
  color: ${({ theme }) => theme.colors.foreground};
  text-decoration: none;
  font-size: 0.875rem;
  padding: 4px 8px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Divider = styled.span`
  width: 1px;
  height: 12px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 4px;
`;

const CompanyInfo = styled.div`
  margin-top: 24px;
`;

const CompanyName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0 0 16px 0;
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: 12px;
  }
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;
  min-width: 140px;
`;

const InfoValue = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Copyright = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 16px 0 0 0;
`;

export default AppFooter;

