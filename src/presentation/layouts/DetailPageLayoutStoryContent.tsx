import { palette } from '@/presentation/styles/tokens';
import React from 'react';
import styled from 'styled-components';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import { H1, H2, P } from '@/presentation/components/styled/Typography';

const ContentSection = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const DetailLayoutDefaultChildren = (
  <>
    <ContentSection>
      <H1>상세 페이지 제목</H1>
      <P style={{ marginTop: '16px' }}>상세 페이지 내용이 여기에 표시됩니다. 최대 너비 672px로 제한되어 있습니다.</P>
    </ContentSection>
    <ContentSection>
      <H2>섹션 1</H2>
      <P style={{ marginTop: '8px' }}>섹션 내용 1</P>
    </ContentSection>
    <ContentSection>
      <H2>섹션 2</H2>
      <P style={{ marginTop: '8px' }}>섹션 내용 2</P>
    </ContentSection>
  </>
);

export const CampaignDetailLayoutExample: React.FC = () => (
  <DetailPageLayout>
    <ContentSection>
      <H1>2024 봄/여름 컬렉션 모델 모집</H1>
      <P style={{ marginTop: '16px', color: palette.primary, fontWeight: 600 }}>패션 브랜드</P>
      <P style={{ marginTop: '8px' }}>패션 쇼와 광고 촬영에 참여할 모델을 모집합니다.</P>
    </ContentSection>
    <ContentSection>
      <H2>모집 내용</H2>
      <P style={{ marginTop: '8px' }}>
        - 패션 쇼 모델 5명
        <br />- 광고 촬영 모델 3명
        <br />- 기간: 2024년 3월 ~ 5월
      </P>
    </ContentSection>
    <ContentSection>
      <H2>지원 자격</H2>
      <P style={{ marginTop: '8px' }}>
        - 나이: 20세 ~ 30세
        <br />- 키: 165cm 이상
        <br />- 경력: 무관
      </P>
    </ContentSection>
    <ContentSection>
      <H2>지원 방법</H2>
      <P style={{ marginTop: '8px' }}>아래 지원하기 버튼을 클릭하여 지원서를 작성해주세요.</P>
    </ContentSection>
  </DetailPageLayout>
);

export const PortfolioDetailLayoutExample: React.FC = () => (
  <DetailPageLayout>
    <ContentSection>
      <H1>김모델 포트폴리오</H1>
      <P style={{ marginTop: '16px' }}>패션 모델, 5년 경력</P>
    </ContentSection>
    <ContentSection>
      <H2>프로필</H2>
      <P style={{ marginTop: '8px' }}>
        - 이름: 김모델
        <br />- 나이: 28세
        <br />- 키: 170cm
        <br />- 체중: 50kg
      </P>
    </ContentSection>
    <ContentSection>
      <H2>경력</H2>
      <P style={{ marginTop: '8px' }}>
        - 2019년 ~ 현재: 프리랜스 패션 모델
        <br />- 주요 작품: 패션 잡지, 광고 촬영 다수
      </P>
    </ContentSection>
    <ContentSection>
      <H2>작품</H2>
      <P style={{ marginTop: '8px' }}>작품 이미지들이 여기에 표시됩니다.</P>
    </ContentSection>
  </DetailPageLayout>
);

export const LongContentLayoutExample: React.FC = () => (
  <DetailPageLayout>
    {Array.from({ length: 10 }, (_, i) => (
      <ContentSection key={i}>
        <H2>섹션 {i + 1}</H2>
        <P style={{ marginTop: '8px' }}>
          {Array.from({ length: 5 }, (_, j) => (
            <React.Fragment key={j}>
              이것은 {i + 1}번째 섹션의 {j + 1}번째 문단입니다. 상세 페이지 레이아웃은 최대 너비 672px로 제한되어 있어 가독성을
              유지합니다.
              <br />
            </React.Fragment>
          ))}
        </P>
      </ContentSection>
    ))}
  </DetailPageLayout>
);

